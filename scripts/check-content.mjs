#!/usr/bin/env node
// Checks every step file in content/steps/ against content/step.schema.json (#45).
//
// Run it with `npm run check:content`. It also runs automatically before
// `npm start` and `npm run build`, and in CI, so a step file with a missing
// field (for example no source or no last-checked date) can never be deployed.
//
// On top of the schema it checks what a schema cannot:
// - the file name is a valid step id
// - lastChecked is a real date and not in the future
// - every step in `requires` exists and is not the step itself
// - `requires` has no cycles (a step cannot wait for itself through others)
// - `passes` (#87): each name only once, and every stay has at least one pass
//
// checkContent() is exported so the step data build (#44) can reuse it.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Checks all step files in `<contentDir>/steps/`.
 *
 * @param {object} [options]
 * @param {string} [options.contentDir] Folder that holds step.schema.json and steps/.
 * @param {Date} [options.today] Used to reject lastChecked dates in the future.
 * @returns {{ steps: Record<string, object>, errors: string[], warnings: string[] }}
 *   `steps` holds the valid steps by id. `errors` is empty when everything is fine.
 */
export function checkContent({ contentDir = defaultContentDir(), today = new Date() } = {}) {
  const errors = [];
  const warnings = [];
  const steps = {};

  const schemaPath = join(contentDir, 'step.schema.json');
  const stepsDir = join(contentDir, 'steps');
  const shown = (path) => relative(process.cwd(), path) || path;

  if (!existsSync(schemaPath)) {
    return { steps, errors: [`${shown(schemaPath)}: schema file not found`], warnings };
  }
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const validate = new Ajv({ allErrors: true }).compile(schema);
  const stays = schema.definitions?.pass?.properties?.fitsStay?.items?.enum ?? [];

  if (!existsSync(stepsDir)) {
    warnings.push(`${shown(stepsDir)}: folder not found, so there are no step files to check`);
    return { steps, errors, warnings };
  }

  const files = readdirSync(stepsDir)
    .filter((name) => name.endsWith('.json'))
    .sort();
  if (files.length === 0) {
    warnings.push(`${shown(stepsDir)}: no step files yet`);
  }

  for (const name of files) {
    const path = join(stepsDir, name);
    const where = shown(path);
    const id = name.slice(0, -'.json'.length);
    const fileErrors = [];

    if (!ID_PATTERN.test(id)) {
      fileErrors.push(
        `file name "${name}" is not a valid step id: use lowercase words joined by hyphens, for example tax-code.json`,
      );
    }

    let step;
    try {
      step = JSON.parse(readFileSync(path, 'utf8'));
    } catch (error) {
      errors.push(`${where}: not valid JSON (${error.message})`);
      continue;
    }

    if (!validate(step)) {
      fileErrors.push(...describeSchemaErrors(validate.errors));
    } else if (step.passes) {
      fileErrors.push(...checkPasses(step.passes, stays));
    }

    if (typeof step?.lastChecked === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(step.lastChecked)) {
      const problem = checkDate(step.lastChecked, today);
      if (problem) fileErrors.push(`"lastChecked" ${problem}`);
    }

    if (fileErrors.length > 0) {
      errors.push(...unique(fileErrors).map((message) => `${where}: ${message}`));
    } else {
      steps[id] = step;
    }
  }

  // Links between steps can only be checked once every file has been read.
  const ids = new Set(files.map((name) => name.slice(0, -'.json'.length)));
  for (const [id, step] of Object.entries(steps)) {
    step.requires.forEach((link, index) => {
      const where = `${shown(join(stepsDir, `${id}.json`))}: "requires[${index}].step"`;
      if (link.step === id) {
        errors.push(`${where} is "${id}", the step itself`);
      } else if (!ids.has(link.step)) {
        errors.push(
          `${where} is "${link.step}", but there is no file content/steps/${link.step}.json`,
        );
      }
    });
  }

  const cycle = findCycle(steps);
  if (cycle) {
    errors.push(`content/steps: the "requires" links form a loop: ${cycle.join(' -> ')}`);
  }

  return { steps, errors, warnings };
}

/** Turns Ajv errors into short messages that name the field. */
export function describeSchemaErrors(ajvErrors = []) {
  const messages = [];
  for (const error of ajvErrors) {
    const field = fieldName(error.instancePath);
    switch (error.keyword) {
      case 'required': {
        const missing = error.params.missingProperty;
        const full = field ? `${field}.${missing}` : missing;
        messages.push(`missing required field "${full}"`);
        break;
      }
      case 'additionalProperties':
        messages.push(
          `unknown field "${field ? `${field}.` : ''}${error.params.additionalProperty}" (check the spelling against content/step.schema.json)`,
        );
        break;
      case 'minItems':
        messages.push(`"${field}" must have at least ${error.params.limit} item(s)`);
        break;
      case 'minLength':
        messages.push(`"${field}" must not be empty`);
        break;
      case 'maxLength':
        messages.push(`"${field}" must be at most ${error.params.limit} characters`);
        break;
      case 'type':
        messages.push(`"${field}" must be of type ${error.params.type}`);
        break;
      case 'enum':
        messages.push(`"${field}" must be one of: ${error.params.allowedValues.join(', ')}`);
        break;
      case 'pattern':
        messages.push(`"${field}" ${patternHint(field)}`);
        break;
      case 'if':
        // Reported through the "required" error that comes with it.
        break;
      default:
        messages.push(`"${field || '(file)'}" ${error.message}`);
    }
  }
  return messages;
}

function fieldName(instancePath) {
  // "/sources/0/url" -> "sources[0].url"
  return instancePath
    .split('/')
    .filter(Boolean)
    .map((part) => (/^\d+$/.test(part) ? `[${part}]` : `.${part}`))
    .join('')
    .replace(/^\./, '');
}

function patternHint(field) {
  if (field === 'lastChecked') return 'must be a date written as YYYY-MM-DD';
  if (field.endsWith('.url')) return 'must be a full link starting with https://';
  if (field.endsWith('.step')) return 'must be a step id: lowercase words joined by hyphens';
  return 'has the wrong format';
}

function checkDate(value, today) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const real =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  if (!real) return `is "${value}", which is not a real date`;

  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  // One day of slack, so a date written in a time zone ahead of UTC still passes.
  if (date.getTime() > todayUtc + 24 * 60 * 60 * 1000) {
    return `is "${value}", which is in the future`;
  }
  return null;
}

/**
 * What the schema cannot check about the passes: every name only once, and at least one pass
 * for every stay, so the price table always highlights something.
 */
function checkPasses(passes, stays) {
  const problems = [];
  const names = new Set();
  passes.forEach((pass, index) => {
    if (names.has(pass.name)) {
      problems.push(
        `"passes[${index}].name" is "${pass.name}", which an earlier pass already uses`,
      );
    }
    names.add(pass.name);
  });
  for (const stay of stays) {
    if (!passes.some((pass) => pass.fitsStay.includes(stay))) {
      problems.push(
        `"passes": no pass has "${stay}" in "fitsStay", so nothing would be highlighted for that stay`,
      );
    }
  }
  return problems;
}

function findCycle(steps) {
  const state = {}; // undefined = not visited, 1 = on the current path, 2 = done
  const path = [];

  const visit = (id) => {
    if (state[id] === 2 || !steps[id]) return null;
    if (state[id] === 1) return [...path.slice(path.indexOf(id)), id];
    state[id] = 1;
    path.push(id);
    for (const link of steps[id].requires) {
      if (link.step === id) continue; // reported separately
      const cycle = visit(link.step);
      if (cycle) return cycle;
    }
    path.pop();
    state[id] = 2;
    return null;
  };

  for (const id of Object.keys(steps).sort()) {
    const cycle = visit(id);
    if (cycle) return cycle;
  }
  return null;
}

function unique(list) {
  return [...new Set(list)];
}

function defaultContentDir() {
  return resolve(dirname(fileURLToPath(import.meta.url)), '..', 'content');
}

// Run as a command: print the result and exit with 1 if anything is wrong.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { steps, errors, warnings } = checkContent();
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  if (errors.length > 0) {
    console.error(`Step content check failed with ${errors.length} problem(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  const count = Object.keys(steps).length;
  console.log(`Step content check passed: ${count} step file(s) in content/steps.`);
}

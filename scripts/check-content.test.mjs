// Tests for the step content check (#45). Run with `npm run test:scripts`.
//
// Each test writes step files into a temporary content folder next to a copy of
// the real content/step.schema.json, so the tests always use the current schema.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkContent } from './check-content.mjs';

const realSchema = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'content',
  'step.schema.json',
);
const today = new Date('2026-11-17T12:00:00Z');

function validStep(overrides = {}) {
  return {
    title: 'Get your tax code',
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    startFromHome: true,
    requires: [],
    deadline: null,
    sources: [{ title: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/' }],
    lastChecked: '2026-11-17',
    guide: {
      whatItIs: ['The tax code identifies you in Italy.'],
      bring: [{ text: 'Passport or ID card' }],
      fromHome: ['Ask the Italian consulate.'],
      commonMistakes: ['Going to the office without an appointment.'],
      whatComesNext: ['Order the transport pass.'],
    },
    ...overrides,
  };
}

function without(object, key) {
  const copy = { ...object };
  delete copy[key];
  return copy;
}

/** Creates a content folder with the given files ({ "tax-code.json": object or raw string }). */
function contentWith(files) {
  const dir = mkdtempSync(join(tmpdir(), 'content-check-'));
  copyFileSync(realSchema, join(dir, 'step.schema.json'));
  mkdirSync(join(dir, 'steps'));
  for (const [name, content] of Object.entries(files)) {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    writeFileSync(join(dir, 'steps', name), text);
  }
  return dir;
}

function run(files) {
  const dir = contentWith(files);
  try {
    return checkContent({ contentDir: dir, today });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function assertError(result, ...parts) {
  const found = result.errors.some((error) => parts.every((part) => error.includes(part)));
  assert.ok(
    found,
    `expected an error containing ${JSON.stringify(parts)}, got:\n${result.errors.join('\n')}`,
  );
}

test('a complete step file passes', () => {
  const result = run({ 'tax-code.json': validStep() });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(Object.keys(result.steps), ['tax-code']);
});

test('the template shape with requires and a deadline passes', () => {
  const result = run({
    'tax-code.json': validStep(),
    'residence-permit.json': validStep({
      title: 'Request your residence permit',
      appliesTo: ['non-eu'],
      startFromHome: false,
      deadline: { workingDays: 8, countsFrom: 'arrival' },
      guide: {
        ...without(validStep().guide, 'fromHome'),
        afterArrival: ['Go to the post office.'],
      },
    }),
    'transport-pass.json': validStep({
      requires: [
        { step: 'tax-code', status: 'confirmed' },
        { step: 'residence-permit', status: 'unknown' },
      ],
    }),
  });
  assert.deepEqual(result.errors, []);
  assert.equal(Object.keys(result.steps).length, 3);
});

test('fails when a step has no sources field', () => {
  const result = run({ 'tax-code.json': without(validStep(), 'sources') });
  assertError(result, 'tax-code.json', 'missing required field "sources"');
  assert.deepEqual(result.steps, {});
});

test('fails when sources is an empty list', () => {
  const result = run({ 'tax-code.json': validStep({ sources: [] }) });
  assertError(result, 'tax-code.json', '"sources" must have at least 1 item');
});

test('fails when a source has no link', () => {
  const result = run({
    'tax-code.json': validStep({ sources: [{ title: 'Agenzia delle Entrate' }] }),
  });
  assertError(result, 'missing required field "sources[0].url"');
});

test('fails when a source link is not https', () => {
  const result = run({
    'tax-code.json': validStep({ sources: [{ title: 'Agenzia', url: 'http://example.org' }] }),
  });
  assertError(result, '"sources[0].url" must be a full link starting with https://');
});

test('fails when a step has no last-checked date', () => {
  const result = run({ 'tax-code.json': without(validStep(), 'lastChecked') });
  assertError(result, 'tax-code.json', 'missing required field "lastChecked"');
});

test('fails when the last-checked date has the wrong format', () => {
  const result = run({ 'tax-code.json': validStep({ lastChecked: '17.11.2026' }) });
  assertError(result, '"lastChecked" must be a date written as YYYY-MM-DD');
});

test('fails when the last-checked date does not exist', () => {
  const result = run({ 'tax-code.json': validStep({ lastChecked: '2026-02-30' }) });
  assertError(result, '"lastChecked" is "2026-02-30", which is not a real date');
});

test('fails when the last-checked date is in the future', () => {
  const result = run({ 'tax-code.json': validStep({ lastChecked: '2027-01-01' }) });
  assertError(result, '"lastChecked" is "2027-01-01", which is in the future');
});

test('names every missing field, not only the first', () => {
  const result = run({ 'tax-code.json': without(without(validStep(), 'sources'), 'lastChecked') });
  assertError(result, '"sources"');
  assertError(result, '"lastChecked"');
});

test('fails when the guide section required by startFromHome is missing', () => {
  const result = run({
    'tax-code.json': validStep({ guide: without(validStep().guide, 'fromHome') }),
  });
  assertError(result, 'missing required field "guide.fromHome"');
});

test('fails on a misspelt field', () => {
  const result = run({ 'tax-code.json': { ...validStep(), lastchecked: '2026-11-17' } });
  assertError(result, 'unknown field "lastchecked"');
});

test('fails on a wrong enum value', () => {
  const result = run({ 'tax-code.json': validStep({ appliesTo: ['EU'] }) });
  assertError(result, '"appliesTo[0]" must be one of: eu, non-eu');
});

test('fails when a file is not valid JSON', () => {
  const result = run({ 'tax-code.json': '{ "title": "Get your tax code", }' });
  assertError(result, 'tax-code.json', 'not valid JSON');
});

test('fails when the file name is not a valid step id', () => {
  const result = run({ 'Tax_Code.json': validStep() });
  assertError(result, 'Tax_Code.json', 'not a valid step id');
});

test('fails when requires points to a step that does not exist', () => {
  const result = run({
    'transport-pass.json': validStep({ requires: [{ step: 'tax-cod', status: 'confirmed' }] }),
  });
  assertError(
    result,
    'transport-pass.json',
    '"requires[0].step" is "tax-cod"',
    'no file content/steps/tax-cod.json',
  );
});

test('fails when a step requires itself', () => {
  const result = run({
    'tax-code.json': validStep({ requires: [{ step: 'tax-code', status: 'confirmed' }] }),
  });
  assertError(result, '"requires[0].step" is "tax-code", the step itself');
});

test('fails when requires links form a loop', () => {
  const result = run({
    'tax-code.json': validStep({ requires: [{ step: 'residence-permit', status: 'unknown' }] }),
    'residence-permit.json': validStep({ requires: [{ step: 'tax-code', status: 'confirmed' }] }),
  });
  assertError(result, 'loop', 'residence-permit -> tax-code -> residence-permit');
});

test('only the broken file is left out of the result', () => {
  const result = run({
    'tax-code.json': validStep(),
    'sim-card.json': without(validStep(), 'sources'),
  });
  assert.deepEqual(Object.keys(result.steps), ['tax-code']);
  assert.equal(result.errors.length, 1);
});

test('an empty steps folder passes with a warning', () => {
  const result = run({});
  assert.deepEqual(result.errors, []);
  assert.match(result.warnings.join('\n'), /no step files yet/);
});

test('ignores files that are not JSON', () => {
  const result = run({ 'tax-code.json': validStep(), 'notes.md': '# notes' });
  assert.deepEqual(result.errors, []);
});

function pass(overrides = {}) {
  return {
    name: 'Flex Pass',
    price: '€22 a day at most',
    period: 'No fixed period',
    ageLimit: null,
    fitsStay: ['semester', 'year'],
    whoCanGetIt: 'Anyone who studies in South Tyrol.',
    ...overrides,
  };
}

test('a step with passes for every stay passes', () => {
  const result = run({
    'transport-pass.json': validStep({
      passes: [
        pass({ name: 'U26 Fix30 Pass', ageLimit: 26, fitsStay: ['semester'] }),
        pass({ name: 'Fix365 Pass', fitsStay: ['year'] }),
      ],
    }),
  });
  assert.deepEqual(result.errors, []);
});

test('fails when passes is an empty list', () => {
  const result = run({ 'transport-pass.json': validStep({ passes: [] }) });
  assertError(result, '"passes" must have at least 1 item');
});

test('fails when a pass has no age limit', () => {
  const result = run({
    'transport-pass.json': validStep({ passes: [without(pass(), 'ageLimit')] }),
  });
  assertError(result, 'transport-pass.json', 'missing required field "passes[0].ageLimit"');
});

test('fails when a pass fits an unknown stay', () => {
  const result = run({
    'transport-pass.json': validStep({ passes: [pass({ fitsStay: ['month'] })] }),
  });
  assertError(result, '"passes[0].fitsStay[0]" must be one of: semester, year');
});

test('fails when two passes have the same name', () => {
  const result = run({ 'transport-pass.json': validStep({ passes: [pass(), pass()] }) });
  assertError(result, '"passes[1].name" is "Flex Pass", which an earlier pass already uses');
});

test('fails when no pass fits a stay', () => {
  const result = run({
    'transport-pass.json': validStep({ passes: [pass({ fitsStay: ['year'] })] }),
  });
  assertError(result, '"passes": no pass has "semester" in "fitsStay"');
  assert.deepEqual(result.steps, {});
});

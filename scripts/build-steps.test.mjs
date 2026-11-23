// Tests for the step data build (#44). Run with `npm run test:scripts`.
//
// Each test builds from a temporary content folder with a copy of the real
// content/step.schema.json and writes into a temporary output file.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSteps } from './build-steps.mjs';

const realSchema = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'content',
  'step.schema.json',
);
const today = new Date('2026-11-22T12:00:00Z');

function validStep(overrides = {}) {
  return {
    $schema: '../step.schema.json',
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

/** Builds from a content folder with the given step files; returns the result and output path. */
function buildWith(files) {
  const dir = mkdtempSync(join(tmpdir(), 'build-steps-'));
  copyFileSync(realSchema, join(dir, 'step.schema.json'));
  mkdirSync(join(dir, 'steps'));
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dir, 'steps', name), JSON.stringify(content, null, 2));
  }
  const outFile = join(dir, 'steps.generated.ts');
  return { result: buildSteps({ contentDir: dir, outFile, today }), outFile };
}

/** Reads the step array back out of a generated module. */
function readData(outFile) {
  const text = readFileSync(outFile, 'utf8');
  const json = text.slice(text.indexOf('= ') + 2, text.lastIndexOf(';'));
  return JSON.parse(json);
}

test('writes every step with its id, sorted by id', () => {
  const { result, outFile } = buildWith({
    'tax-code.json': validStep(),
    'bank-account.json': validStep({ title: 'Open a bank account', optional: true }),
  });

  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.ids, ['bank-account', 'tax-code']);
  const data = readData(outFile);
  assert.deepEqual(
    data.map((s) => [s.id, s.title]),
    [
      ['bank-account', 'Open a bank account'],
      ['tax-code', 'Get your tax code'],
    ],
  );
});

test('leaves out the $schema line of the step file', () => {
  const { outFile } = buildWith({ 'tax-code.json': validStep() });

  assert.equal('$schema' in readData(outFile)[0], false);
});

test('keeps the source, last-checked date and guide as written', () => {
  const step = validStep();
  const { outFile } = buildWith({ 'tax-code.json': step });
  const written = readData(outFile)[0];

  assert.deepEqual(written.sources, step.sources);
  assert.equal(written.lastChecked, step.lastChecked);
  assert.deepEqual(written.guide, step.guide);
});

test('types the data as Step so the TypeScript build checks it too', () => {
  const { outFile } = buildWith({ 'tax-code.json': validStep() });
  const text = readFileSync(outFile, 'utf8');

  assert.match(text, /import type \{ Step \} from '\.\/step';/);
  assert.match(text, /export const stepData: readonly Step\[\] = /);
});

test('writes an empty list when there are no step files yet', () => {
  const { result, outFile } = buildWith({});

  assert.deepEqual(result.errors, []);
  assert.deepEqual(readData(outFile), []);
});

test('writes nothing when a step file fails the content check', () => {
  const broken = validStep();
  delete broken.sources;
  const { result, outFile } = buildWith({ 'tax-code.json': broken });

  assert.ok(result.errors.some((e) => e.includes('missing required field "sources"')));
  assert.equal(existsSync(outFile), false);
});

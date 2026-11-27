# scripts

Node.js scripts that run outside the app, for example before the build.

## Step content check (`check-content.mjs`, #45)

Checks every step file in `content/steps/` against [content/step.schema.json](../content/step.schema.json) and stops with the file and field name when something is wrong.

```bash
npm run check:content   # check the step files
npm run test:scripts    # run the tests for the check
```

It runs automatically:

- before `npm start`, `npm test` and `npm run build`, as the first part of the step data build below, so a broken step file also stops the Vercel build
- in CI, as the "Step content check" step of the [`app` workflow](../.github/workflows/app.yml), on every pull request and every push to `main`

What it checks:

| Check | Example message |
| --- | --- |
| Every field the schema requires is there, including a source and a last-checked date | `content/steps/tax-code.json: missing required field "sources"` |
| Lists that must not be empty have at least one item | `content/steps/tax-code.json: "sources" must have at least 1 item` |
| Formats: links start with `https://`, dates are `YYYY-MM-DD`, ids are lowercase with hyphens | `content/steps/tax-code.json: "lastChecked" must be a date written as YYYY-MM-DD` |
| `lastChecked` is a real date and not in the future | `content/steps/tax-code.json: "lastChecked" is "2026-02-30", which is not a real date` |
| No misspelt or unknown fields | `content/steps/tax-code.json: unknown field "lastchecked"` |
| The file name is a valid step id | `content/steps/Tax_Code.json: file name "Tax_Code.json" is not a valid step id` |
| Every step in `requires` has its own file, and is not the step itself | `content/steps/transport-pass.json: "requires[0].step" is "tax-cod", but there is no file content/steps/tax-cod.json` |
| `requires` links do not form a loop | `content/steps: the "requires" links form a loop: residence-permit -> tax-code -> residence-permit` |
| Each pass in `passes` has a name, price, period, age limit, the stays it fits and who can get it | `content/steps/transport-pass.json: missing required field "passes[0].ageLimit"` |
| Pass names are not used twice | `content/steps/transport-pass.json: "passes[1].name" is "Flex Pass", which an earlier pass already uses` |
| Every stay has at least one pass, so the price table always highlights something | `content/steps/transport-pass.json: "passes": no pass has "semester" in "fitsStay", so nothing would be highlighted for that stay` |

An empty or missing `content/steps/` folder only prints a warning, so the build keeps working until the first step files arrive (#50). Files in `content/templates/` are not checked.

`checkContent()` is exported, so the step data build (#44) can reuse it instead of reading the files a second time.

## Step data build (`build-steps.mjs`, #44)

Turns the step files into the data the app shows, so editing and merging a step file updates the deployed app with no code change.

```bash
npm run build:steps     # check the step files, then write src/core/steps.generated.ts
```

It runs the content check first and writes nothing if any step file is wrong. Otherwise it writes `src/core/steps.generated.ts`: every step with its `id` (the file name), sorted by id, without the `$schema` line, typed as `Step` from [src/core/step.ts](../src/core/step.ts) so the TypeScript build checks the data once more.

It runs automatically before `npm start`, `npm test`, `npm run watch` and `npm run build` (npm `pre` scripts), so Vercel and CI always build from the current step files. The generated file is not committed (it is in `.gitignore`). `ng serve` does not watch `content/steps/`: after editing a step file, restart `npm start` to see the change.

App code reads the steps through `loadSteps()` in [src/core/steps.ts](../src/core/steps.ts), or `inject(STEPS)` in a component ([src/app/steps.ts](../src/app/steps.ts)). The page `/steps` lists every loaded step with its main source and last-checked date.

# scripts

Node.js scripts that run outside the app, for example before the build.

## Step content check (`check-content.mjs`, #45)

Checks every step file in `content/steps/` against [content/step.schema.json](../content/step.schema.json) and stops with the file and field name when something is wrong.

```bash
npm run check:content   # check the step files
npm run test:scripts    # run the tests for the check
```

It runs automatically:

- before `npm start` and `npm run build` (npm `prestart` and `prebuild`), so a broken step file also stops the Vercel build
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

An empty or missing `content/steps/` folder only prints a warning, so the build keeps working until the first step files arrive (#50). Files in `content/templates/` are not checked.

`checkContent()` is exported, so the step data build (#44) can reuse it instead of reading the files a second time.

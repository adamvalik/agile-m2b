# src/core

Plain TypeScript logic of the app, with no Angular in it. Code here must never import from `@angular/*`, so anyone on the team can own it and test it without knowing Angular.

Contents (Sprint 1):

| Module | What it does | Task |
| --- | --- | --- |
| `arrival-date.ts` | Checks, reads, writes and formats dates (`YYYY-MM-DD`); `addWorkingDays()` counts Saturdays but not Sundays | #48, #52 |
| `answers.ts` | The `Answers` type (status, arrival date, stay, optional under 26), `loadAnswers()`, `loadSavedAnswers()` and `saveAnswers()` in `localStorage` | #47, #49, #88 |
| Step types and loading | `step.ts`: the `Step` type. `steps.ts`: `loadSteps()`, `findStep()`, `mainSource()` over the data that `scripts/build-steps.mjs` generates into `steps.generated.ts` (not committed) | #44 |
| Checklist builder | `buildChecklist(steps, answers)`: filters and orders steps for the student | #51 |
| `checklist-items.ts` | `toChecklistItems()`: Next, Waiting, Optional, Done and to-do per step, what each step still waits for given the done marks, and its due date; `stepNote()` and `stepShortName()` for the checklist rows; `checklistProgress()`: required steps done and the next step | #52, #80, #81 |
| `progress.ts` | `loadDone()`, `saveDone()` and `toggleDone()`: the ids of the steps marked done, in `localStorage` next to the answers | #78 |

Every module gets a `*.spec.ts` next to it. Tests run with `npm test` (Vitest).

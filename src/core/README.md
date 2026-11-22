# src/core

Plain TypeScript logic of the app, with no Angular in it. Code here must never import from `@angular/*`, so anyone on the team can own it and test it without knowing Angular.

Contents (Sprint 1):

| Module | What it does | Task |
| --- | --- | --- |
| `arrival-date.ts` | Checks, reads, writes and formats the arrival date (`YYYY-MM-DD`) | #48 |
| `answers.ts` | The `Answers` type, `loadAnswers()` and `saveAnswers()` in `localStorage` | #47, #49 |
| Step types and loading (planned) | Typed steps read from the generated step data | #44 |
| Checklist builder (planned) | `buildChecklist(steps, answers)`: filters and orders steps for the student | #51 |
| Progress (planned) | Done marks in `localStorage`, next to the answers | #53 |

Every module gets a `*.spec.ts` next to it. Tests run with `npm test` (Vitest).

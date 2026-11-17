# src/core

Plain TypeScript logic of the app, with no Angular in it. Code here must never import from `@angular/*`, so anyone on the team can own it and test it without knowing Angular.

Planned contents (Sprint 1):

| Module | What it does | Task |
| --- | --- | --- |
| Step types and loading | Typed steps read from the generated step data | #44 |
| Checklist builder | `buildChecklist(steps, answers)`: filters and orders steps for the student | #51 |
| Answers and progress | Reads and writes answers and done marks in `localStorage` | #53 |

Every module gets a `*.spec.ts` next to it. Tests run with `npm test` (Vitest).

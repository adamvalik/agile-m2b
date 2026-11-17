# scripts

Node.js scripts that run outside the app, for example before the build.

Planned for Sprint 1:

- **Content check and build step** (#45, #44): validates every step file in `content/` against `content/step.schema.json` (#43), fails with the file and field name when something is missing, and writes the step data the app imports. It will run automatically before `npm start`, `npm run build` and in CI.

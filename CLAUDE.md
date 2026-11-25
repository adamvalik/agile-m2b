# CLAUDE.md

Team M2B's project for the unibz Agile Processes course (autumn 2026).

## Product

A web app that gives incoming exchange students at unibz one clear, ordered overview of their first weeks in Bolzano. The MVP is an adaptive checklist (EU/non-EU, arrival date) with short step-by-step guides for official steps: tax code, transport pass, residence permit (non-EU), SIM, bank account. The vision stays open beyond official steps (map, activity groups, tips from earlier students), so don't describe it as only a bureaucracy checklist.

Constraints from the backlog: no account and no personal data; progress is stored locally only; every step shows its source and a last-checked date; steps live as editable content files.

## Team

Adam (lead, PM), Laurel (backend, QA), Tom (UI/UX), Richard (backend). Coordination via WhatsApp, GitHub and GitHub Projects.

## Repo layout

- `README.md`: project front page (product, stack, how we work, repo layout)
- `project-context.md`: team project context (Deliverable 1)
- `product-vision.md`: Product Vision (Deliverable 2); PDFs of both in `deliverables/`
- `research/`: desk research, online coding sheet, competitor research, interview notes P1 to P5 (anonymised)
- `deliverable3-task.md`: current assignment, Sprint 1 (planning, task board, first increment, review, retro, report)
- `sprints/sprint-1-plan.md`: Sprint Goal, Sprint Backlog (19 points), task breakdown and owners; `sprint-1-review.md`, `sprint-1-retrospective.md`
- `sprints/sprint-2-plan.md`: Sprint 2 plan (one week, 17 points), refinement of #7 to #12 and new stories
- `sprints/meeting-log.md`: notes from every team meeting (attendees, decisions, next steps), newest first
- `definition-of-done.md`: team Definition of Done, with a change log updated at retrospectives

- `src/app/`: Angular 22 app (UI), `src/core/`: plain TypeScript logic, `scripts/`: build-time scripts, `content/`: step files
- `libs/ui/`: spartan/ui components (imported as `@spartan-ng/helm/<name>`); `design/`: link to the Figma file and exported screens
- `docs/angular-best-practices.md`: Angular conventions

Stack: Angular 22 + TypeScript (standalone, zoneless, Vitest), hosted on Vercel. Node.js 24 via `.nvmrc`. Commands: `npm start`, `npm test`, `npm run build`.

## Code conventions

- `src/core/` never imports from `@angular/*`; it holds pure, unit-tested functions (checklist building, storage). Components in `src/app/` call into it.
- Pages live in `src/app/pages/<name>/` and are lazy-loaded from `app.routes.ts`.
- Components use separate files: `<name>.component.ts`, `.html` and `.spec.ts` (no inline templates). Style only with Tailwind classes in the template: no component `.css` files, `styleUrl` or `styles`.
- Build UI from the spartan/ui components in `libs/ui/` and Tailwind utility classes, following the Figma screens in `design/`. Theme colours are CSS variables in `src/styles.css`, the only stylesheet. Prettier sorts the classes (prettier-plugin-tailwindcss).
- Answers and progress are stored only in `localStorage`; never send data to a server or ask for names, documents, passport numbers or tax codes.
- Every logic change in `src/core/` comes with a `*.spec.ts` test; run `npm test` and `npm run build` before opening a PR.
- Follow the Angular conventions below.

@docs/angular-best-practices.md

## Backlog and sprints

The source of truth is the GitHub Projects board "M2B Agile Processes" (`adamvalik`, project 1); items are issues in `adamvalik/agile-m2b`. Read it with:

```bash
gh project item-list 1 --owner adamvalik --limit 300 --format json
```

Fields: Status, Sprint, Priority (P0/P1/P2), Estimate (1/2/3/5). Issue bodies use the template: "## User story", "## Acceptance criteria" (checkboxes), "## Dependencies".

Sprints: 1 (2026-11-11 to 11-25), 2 (11-26 to 12-02, one week), 3 (12-03 to 12-16). The team decides which stories go into a sprint; don't assign them without asking.

## Working rules

- User testing is possible only with students already in Bolzano; pre-arrival value is checked indirectly.
- Research: don't use the HCD survey; keep interviewee names and identifying details out; cite public sources directly.
- Writing style: no middle dot and no em dash; use commas, colons, parentheses or a new sentence. En dash is fine.

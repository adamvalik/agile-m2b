# M2B: first weeks in Bolzano

A web app that gives incoming exchange students at unibz one clear, ordered overview of their first weeks in Bolzano.

Team M2B's project for the Agile Processes course at the Free University of Bozen-Bolzano (unibz), autumn 2026.

**Live app:** [m2b-agile.vercel.app](https://m2b-agile.vercel.app/) (public, no login; updated on every merge to `main`)

## Why

unibz welcomed a record 196 incoming exchange students this winter semester ([l'Adige, Oct 2026](https://www.ladige.it/progetti/unibz-wird-immer-internationaler-so-viele-austauschstudierende-wie-noch-nie-sgsitjmm)). In their first weeks they face official steps that depend on each other: tax code (codice fiscale), transport pass, SIM card, bank account and, for non-EU students, the residence permit. The information exists, but it is spread across websites, offices, a PDF guide and chat groups, often only in Italian or German, and much of it arrives too late. Students who arranged the tax code from home had no delay; those who found out on arrival waited up to two weeks.

More in the [Product Vision](product-vision.md) and the [research](research/README.md).

## What we are building

**First release (MVP):**

- A short intake: EU or non-EU, and arrival date. No account, no name, no documents.
- A personal checklist of the official steps, in the right order, that adapts to those answers.
- A short step-by-step guide for each step, with its official source and the date we last checked it.
- A clear sign of what can start from home, what has a deadline and what waits on another step.
- Marking steps as done, saved only on the student's own device.

**Principles we keep:**

| Principle | What it means in practice |
| --- | --- |
| No account, no personal data | The app asks only for EU or non-EU status and arrival date |
| Progress stays on the device | Answers and done marks are stored in the browser, never sent anywhere |
| Correct information first | Every step shows its official source and a last-checked date; anything unconfirmed is marked unknown |
| Content without code | Each step is an editable content file, so the information can stay current after our course ends |
| Alongside official sources | We point students to official pages and offices; we do not replace them or act on their behalf |

## Tech stack

| Part | Choice |
| --- | --- |
| Framework | [Angular](https://angular.dev/) with TypeScript, a single-page app |
| App logic | Plain TypeScript in `src/core/`, data in `localStorage` | 
| Step content | Editable files in `content/steps/`, checked and turned into JSON at build time |
| Hosting | [Vercel](https://vercel.com/) | 
| Later backend | A small TypeScript API, for example on [Render](https://render.com/) | 

## Run locally

You need Node.js 22.22.3+ or 24.15+ (required by Angular 22). The repository pins Node.js 24 in `.nvmrc`; with [nvm](https://github.com/nvm-sh/nvm), run `nvm install` once and `nvm use` in each new terminal.

```bash
npm install      # once, and after pulling dependency changes; also activates the commit hook
npm start        # dev server at http://localhost:4200, reloads on save
npm test         # unit tests (Vitest)
npm run build    # production build in dist/agile-m2b/browser
```

Where code goes:

| Folder | What lives there | 
| --- | --- | 
| `src/app/` | Angular components and pages (UI) | 
| `src/core/` | Checklist logic, answers and progress in `localStorage` | 
| `content/` | Step files and their schema | 
| `scripts/` | Content check and build step | 

## Deployment

The [`app` workflow](.github/workflows/app.yml) runs the unit tests and the build on every pull request and every push to `main`. If they pass, it deploys with the Vercel CLI: a pull request gets a preview link (in the workflow summary and the PR's "Deployments"), and a merge to `main` updates the live app at [m2b-agile.vercel.app](https://m2b-agile.vercel.app/). Vercel's own Git integration is switched off in [vercel.json](vercel.json), so deploys never depend on who wrote the commit.

## Edit a step

Coming with [#46](https://github.com/adamvalik/agile-m2b/issues/46), once the step file format ([#43](https://github.com/adamvalik/agile-m2b/issues/43)) is in place.

## How we work

We work in Scrum with three two-week sprints.

| Sprint | Dates | Goal |
| --- | --- | --- |
| 1 | 11 to 25 November | Public app with intake and a personal, ordered checklist built from checked facts ([plan](sprints/sprint-1-plan.md)) |
| 2 | 26 November to 9 December | Planned at Sprint 2 Planning |
| 3 | 10 to 23 December | Planned at Sprint 3 Planning |

- **Backlog and task board:** [M2B Agile Processes](https://github.com/users/adamvalik/projects/1) on GitHub Projects. Stories and tasks are issues in this repository, with priority (P0 to P2) and estimates in story points on stories.
- **Workflow:** Product Backlog → Sprint Backlog → In progress → In review → Done.
- **Definition of Done:** [definition-of-done.md](definition-of-done.md), reviewed at every retrospective.
- **Changes:** every change goes through a pull request reviewed by another team member. Commit messages follow Conventional Commits, checked locally and in CI; see [CONTRIBUTING.md](CONTRIBUTING.md).
- **Testing:** we can test only with students who are already in Bolzano, so value before arrival is checked indirectly.
- **Coordination:** a WhatsApp group for quick questions, GitHub for everything that should last.
- **Meetings:** decisions and next steps from every team meeting go into the [meeting log](sprints/meeting-log.md).

## Team

| Member | Role |
| --- | --- |
| Adam | Team lead, PM, anything that is needed |
| Laurel | Backend, QA |
| Tom | UI/UX |
| Richard | Backend |

## Repository layout

| Path | What it holds |
| --- | --- |
| [src/](src/) | The Angular app (`src/app/`) and plain TypeScript logic (`src/core/`) |
| [scripts/](scripts/) | Build-time scripts, such as the step content check |
| [public/](public/) | Static files served as they are (favicon) |
| [project-context.md](project-context.md) | Team project context (Deliverable 1) |
| [product-vision.md](product-vision.md) | Product Vision (Deliverable 2) |
| [deliverables/](deliverables/) | PDF versions of submitted deliverables |
| [research/](research/) | Desk research, online coding sheet, competitor research, anonymised interview notes |
| [sprints/](sprints/) | Sprint plans, the [meeting log](sprints/meeting-log.md), and later reviews and retrospectives |
| [definition-of-done.md](definition-of-done.md) | Team Definition of Done and its change log |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Commit format and one-time setup |

# CLAUDE.md

Team M2B's project for the unibz Agile Processes course (autumn 2026).

## Product

A web app that gives incoming exchange students at unibz one clear, ordered overview of their first weeks in Bolzano. The MVP is an adaptive checklist (EU/non-EU, arrival date) with short step-by-step guides for official steps: tax code, transport pass, residence permit (non-EU), SIM, bank account. The vision stays open beyond official steps (map, activity groups, tips from earlier students), so don't describe it as only a bureaucracy checklist.

Constraints from the backlog: no account and no personal data; progress is stored locally only; every step shows its source and a last-checked date; steps live as editable content files.

## Team

Adam (lead, PM), Laurel (backend, QA), Tom (UI/UX), Richard (backend). Coordination via WhatsApp, GitHub and GitHub Projects.

## Repo layout

- `README.md`: team project context (Deliverable 1)
- `product-vision.md`: Product Vision (Deliverable 2); PDFs of both in `deliverables/`
- `research/`: desk research, online coding sheet, competitor research, interview notes P1 to P5 (anonymised)
- `deliverable3-task.md`: current assignment, Sprint 1 (planning, task board, first increment, review, retro, report)
- `sprints/sprint-1-plan.md`: Sprint Goal, Sprint Backlog (19 points), task breakdown and owners
- `definition-of-done.md`: team Definition of Done, with a change log updated at retrospectives

No application code yet; the stack is not decided.

## Backlog and sprints

The source of truth is the GitHub Projects board "M2B Agile Processes" (`adamvalik`, project 1); items are issues in `adamvalik/agile-m2b`. Read it with:

```bash
gh project item-list 1 --owner adamvalik --limit 300 --format json
```

Fields: Status, Sprint, Priority (P0/P1/P2), Estimate (1/2/3/5). Issue bodies use the template: "## User story", "## Acceptance criteria" (checkboxes), "## Dependencies".

Sprints: 1 (2026-11-11 to 11-25), 2 (11-26 to 12-09), 3 (12-10 to 12-23). The team decides which stories go into a sprint; don't assign them without asking.

## Working rules

- User testing is possible only with students already in Bolzano; pre-arrival value is checked indirectly.
- Research: don't use the HCD survey; keep interviewee names and identifying details out; cite public sources directly.
- Writing style: no middle dot and no em dash; use commas, colons, parentheses or a new sentence. En dash is fine.

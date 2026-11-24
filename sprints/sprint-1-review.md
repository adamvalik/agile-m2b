# Sprint 1 Review

**When:** Tuesday 24 November 2026, 12:30–13:00
**Who:** Adam, Laurel, Tom, Richard
**Live app:** [m2b-agile.vercel.app](https://m2b-agile.vercel.app/)
**Plan:** [sprint-1-plan.md](sprint-1-plan.md), **Definition of Done:** [definition-of-done.md](../definition-of-done.md)

This document covers part 4 of the Deliverable 3 assignment: which stories were completed, what we can demonstrate, whether the acceptance criteria were met, what feedback we received, and whether the Product Backlog changes. Feedback is recorded with our decision to accept, postpone or reject it, and why.

## Sprint Goal

> By 25 November, an incoming student can open the app on a public link, enter EU or non-EU status and arrival date, and see a personal, ordered checklist of official steps built from facts the team has checked.

**Met?** Yes. All six stories meet the Definition of Done.

## User stories completed

A story counts only if it meets every point of the Definition of Done.

| Story | Points | Evidence | Accepted? |
| --- | --- | --- | --- |
| #1 Open the app on a public link | 3 | Live URL, deploy on every merge (PR #62), README | Yes |
| #2 Check the facts behind each official step | 5 | `research/step-facts/` (PRs #58, #60, #61), dependency table (PR #65), every facts PR cross-reviewed | Yes |
| #28 Sketch the main flow before we build it | 3 | `design/` and Figma (PR #68), agreed through the PR review | Yes |
| #4 Update steps without changing code | 3 | Step format (PR #57), field check (PR #67), loader (PR #70), README "Edit a step" (PR #66), five step files (PR #72) | Yes |
| #5 Tell the app my situation | 2 | Intake form (PR #71) | Yes |
| #6 See my personal, ordered checklist | 3 | Checklist builder (PR #69), checklist screen and guides (PR #73) | Yes |
| **Total** | **19** | | **19 of 19** |

Our first velocity is 19 points, the starting point for Sprint 2 planning.

## Functionality we can demonstrate

The increment is live at [m2b-agile.vercel.app](https://m2b-agile.vercel.app/) and works at phone and desktop width.

- **Public app (#1):** open to anyone without an account. The first page explains what the app is for and that answers stay on the device. Every merge to `main` deploys automatically, and every pull request gets its own preview link.
- **Design (#28):** the live screens follow the agreed phone and desktop sketches in `design/` (first page, intake, checklist with step states, guide).
- **Intake (#5):** two questions, EU or non-EU status and arrival date. Missing answers get a clear message, and the student can change the answers later. The app never asks for a name, documents, a passport number or a tax code, and the answers are stored only in the browser.
- **Personal checklist (#6):** built from the answers, for example the residence permit only for non-EU students. Steps are ordered by their dependencies, so the tax code comes before the transport pass and the bank account. The next step is marked, and each step shows its state (next, waiting, optional), what it waits for, whether it can start from home, and a due date counted from the arrival date. The checklist updates when the answers change.
- **Guides (#2, #6):** each of the five steps (tax code, transport pass, residence permit, SIM card, bank account) opens a short guide with its official source and last-checked date, what the step is, how to do it from home or after arrival, what to bring, common mistakes and what comes next. The facts behind the guides are in `research/step-facts/`, each checked against official sources and reviewed by a second team member.
- **Editable steps (#4):** every step is a JSON file in `content/steps/`. A check stops the build when a required field is missing, and a merged change updates the live app with no code change. The README explains how to edit a step.

## Acceptance criteria

All criteria are ticked in the issues and were confirmed during the demo.

| Story | Criteria | Notes |
| --- | --- | --- |
| #1 | 6 of 6 | |
| #2 | 5 of 5 | |
| #28 | 4 of 4 | Team agreement through the review of PR #68, not a walkthrough meeting |
| #4 | 4 of 4 | |
| #5 | 5 of 5 | |
| #6 | 5 of 5 | |

## User feedback

We did not test with users in Sprint 1. The full flow was only ready on the day of the review, and we can only test with exchange students already in Bolzano. Testing with students is in the Product Backlog (#14); we plan it for the end of Sprint 2, once the next, more interactive iteration is built.

The feedback below comes from the team, after seeing the whole increment working for the first time.

| # | Feedback | Decision | Why |
| --- | --- | --- | --- |
| 1 | The core works, but the app is too simple: it reads like a blog post with five static guides, with little personalisation and little reason to come back | **Accept:** revise the Product Backlog before Sprint 2 planning (section 5) | The product vision is a companion for the first weeks in Bolzano, not only a list of official steps |
| 2 | Parts of later stories are already built with the checklist screen: a guide page for each step with its source and last-checked date, due dates, "waits for" and "start from home" labels | **Accept:** check what is left of #7 to #12 and re-estimate them | Avoid planning work that is already done |

## Product Backlog changes

**Direction:** from a static checklist to an interactive companion that is personal to each student and worth opening more than once.

Draft themes for the refinement, with the existing stories that fit. New stories follow the issue template (user story, acceptance criteria, dependencies).

| Theme | What it could mean | Existing stories | New stories needed? |
| --- | --- | --- | --- |
| Progress | Mark steps as done, see progress, "what to do now" at the top | #13 | Maybe |
| Time | A timeline before and after arrival, deadlines counting down, add a deadline to a calendar | #12 | Yes, for the timeline and calendar |
| Personalisation | More intake questions that change the steps, for example campus (Bolzano, Bressanone, Brunico), length of stay, age (U26 pass), steps already done | | Yes |
| Help at the office | What to say at each office, the Italian-only booking page | #15, #16 | No |
| Beyond official steps | Map of offices and places, tips from earlier students, activity partners, seeing a doctor | #23, #24, #25, #26 | No |
| Testing | Test with students already in Bolzano, and a before-departure scenario | #14, #22 | No |

The no-account and no-personal-data constraints still hold: anything personal stays on the device.

Summary in the [meeting log](meeting-log.md).

# Sprint 1 Retrospective

**When:** Tuesday 24 November 2026, 13:00–13:30, right after the Sprint Review
**Who:** Adam, Laurel, Tom, Richard
**Aim:** answer the five questions of part 5 of the Deliverable 3 assignment, and agree on at least one specific improvement to try in Sprint 2. Update the [Definition of Done](../definition-of-done.md).

## Timeline of Sprint 1

| Date | What happened |
| --- | --- |
| 11 Nov | Sprint Planning: 6 stories, 19 points, 26 tasks. Conventional commits added |
| 13–14 Nov | Step file format PR opened (#57); transport, SIM and bank facts PR opened (#58) |
| 16 Nov | Stack decision PR opened (#59); planned for 13 Nov |
| 17 Nov | Team sync. Stack decision, scaffold and deploy merged (#59, #62); fact PRs merged after review (#58, #60, #61); step format merged (#57) |
| 19 Nov | Sketches PR opened (#68) |
| 20 Nov | Step dependencies merged (#65) |
| 22 Nov | Sketches (#68) and field check (#67) merged; #1, #2 and #28 closed |
| 23 Nov | README (#66), step files (#72), loader (#70) and checklist builder (#69) merged; #4 closed |
| 24 Nov | Intake (#71) and checklist screen (#73) merged in the morning; #5 and #6 closed. Review and Retrospective |

## What went well during Sprint 1

- We delivered all 6 stories (19 points) and the Sprint Goal works end to end on the live app.
- Every facts PR got a real review: changes were requested and fixed before merging (#58, #60, #61, #65). Each step names its official source and last-checked date.
- From 17 November the pipeline worked: every PR runs the content check, tests and build and gets a preview link; a merge to `main` updates the live app.
- The content format and the field check were ready before the step files, so content mistakes are caught automatically.
- The sketches gave the UI a clear target, and the live screens follow them.

## What difficulties or impediments did we encounter

- The stack decision was planned for 13 November and landed on 16 November; the scaffold and deploy followed on 17 November. Until then no app code could start.
- Pull requests waited for review: #57 for 4 days, #67 for 5 days, #66 for 6 days.
- The user-facing stories (#5, #6) depended on almost everything else, so they were merged on the last morning. The plan had set aside the last two days for testing and fixing.
- Tasks were "In progress" without a pushed branch or draft PR, so others could not see how far along they were.
- We got no feedback from users: the working flow was ready only on the day of the review.

## How effectively did our team collaborate

- Reviews were thorough when they happened, but slow to start; most merges came on 17, 22, 23 and 24 November.
- Documentation the team had already agreed on verbally (the stack decision, #59) was merged without a formal review, which is fine.
- One team sync in the middle of the sprint (17 November); other communication was coordinated on WhatsApp.
- On the board, stories and their tasks (sub-issues) blend together: they look the same, the stories stayed in "Sprint Backlog" while their tasks moved, and it was hard to see how far each story was.

## Was our Sprint Planning realistic?

- The amount was right: everything we planned was finished.
- About half the points (#4, #5, #6) were closed in the last two days.
- The dependency order put the stack decision on the critical path; its three-day slip moved all app work into the second week.

## What would we change in the next Sprint

| Problem | Possible improvement |
| --- | --- |
| PRs wait days for review | Enforce reviews in the repository and request reviewers automatically; review within one working day |
| Work is invisible until it is finished | Open a draft PR on the first day of work on a task |
| User-facing work lands on the last day | Build one thin end-to-end slice in the first week, then widen it; aim to finish stories 2 days before the review |
| No user feedback yet | Test the next iteration with students in Bolzano at the end of Sprint 2 (#14) |
| One person on the critical path | Pair on UI tasks, or split them so others take the smaller ones |
| Stories and tasks blend together on the board | Keep stories with tasks as sub-issues, but make stories stand out (see below) |

### Making stories stand out on the board

We keep the structure: a story is an issue, its tasks are sub-issues labelled `task`. Proposed changes to the project "M2B Agile Processes":

1. **Label stories** with a new `story` label, so they can be filtered and look different from tasks.
2. **A separate "Stories" view:** a table filtered to `label:story`, with Sub-issues progress, Estimate, Priority, Sprint and Status. This is where we follow the stories and the points.
3. **Story status rule:** a story moves to In progress when its first task starts, and to Done when it meets the Definition of Done and is accepted at the Review.

### Improvements for Sprint 2

| Improvement | Owner | How we will know it worked |
| --- | --- | --- |
| Make stories stand out on the board: `story` label, task board grouped by parent issue, a "Stories" view, story status rule | Adam | At the Sprint 2 syncs, anyone can see from the board how far each story is |
| Enforce reviews in the repository: a ruleset on `main` requires one approval from another team member and the `check` and `commitlint` checks; `.github/CODEOWNERS` requests the other three as reviewers on every PR. Review within one working day. Documented in [CONTRIBUTING.md](../CONTRIBUTING.md#pull-requests) | Adam (setup), everyone (reviews) | No PR is merged without an approval, except the documented exceptions, and no PR waits more than one working day for a first review |

### Definition of Done

Changed (also recorded in the change log of [definition-of-done.md](../definition-of-done.md)):

- Minor documentation changes, and documents that record something the team already agreed on elsewhere, can be merged without a review. The pull request says why, and where it was agreed. Code, step files and research facts always need a review.

Summary in the [meeting log](meeting-log.md).

# Sprint 2 Plan

**Dates:** Thursday 26 November to Wednesday 2 December 2026 (one week)
**Board:** [M2B Agile Processes](https://github.com/users/adamvalik/projects/1)
**Definition of Done:** [definition-of-done.md](../definition-of-done.md)
**Input:** [Sprint 1 Review](sprint-1-review.md), [Sprint 1 Retrospective](sprint-1-retrospective.md)

## Timeline change

We have five weeks for three sprints. Sprint 1 kept its two weeks, Sprint 2 is one week, and Sprint 3 keeps two weeks.

| Sprint | Dates | Length |
| --- | --- | --- |
| 1 | 11 to 25 November | 2 weeks (done) |
| 2 | 26 November to 2 December | 1 week |
| 3 | 3 to 16 December | 2 weeks |

## Start

- **Velocity:** 19 points in Sprint 1. The scaffold, deploy, content format, field check, intake and checklist now exist, so new work builds on them.
- **Review feedback (accepted):** the app works but reads like a blog post with five static guides. Direction for Sprint 2: from a static checklist to an interactive companion that is personal to each student and worth opening more than once.
- **Retro improvements we apply here:** draft PRs on the first day of a task, reviews within one working day, stories finished two days before the Review, pairing on UI so Tom is not the only one on the critical path, and testing with students at the end of the sprint (#14).

## Backlog refinement

### What is left of #7 to #12

The checklist screen and guides (PR #73) already meet most criteria of these stories.

- **#7, #9, #10 (guides):** the only open criterion is that someone who did not write the guide can follow it without help, and for #10 that a non-EU student reviews it. We check this in the user tests (#14), so these stories close with #14, at 1 point each.
- **#8 (source and last-checked date):** all criteria are met. We verify it and close it at Planning (0 points).
- **#11 (waiting steps):** only "the step becomes available once what it needs is done" is left, built together with #13 (1 point).
- **#12 (start from home and deadlines):** rewritten as a timeline, see below.
- **#17, #18 (SIM card, bank account):** like the guides, only the follow-it-without-help check is left. They are P1 and stay in the Product Backlog.

### #12 rewritten as a timeline

**User story:** As an incoming student, I want to see my steps on a timeline before and after my arrival, so that I know what to do now and what is coming up.

**Acceptance criteria:**
- [ ] The checklist groups steps into "Before you travel", "In your first week" and "Later or when you need it"
- [ ] Before the arrival date it shows how many days are left until arrival, and steps that can start from home come first
- [ ] Each step with a deadline shows its date and how many days are left; a step past its deadline is marked overdue
- [ ] After the arrival date the before-arrival advice is gone and the checklist shows what to do now
- [ ] Non-EU students see the latest date for the permit request, with a note on how the deadline is counted

**Dependencies:** #13 (done steps leave the timeline's "now").

### New story #76: see the transport pass and prices that fit my stay and age

The review asked for more personalisation. Every exchange student stays at least one semester, so the useful question is one semester or a full year: it changes which transport pass is worth it, together with being under 26. The residence permit stays for every non-EU student. Whether full degree students need the app is a separate question for the Product Backlog (#98).

**User story:** As an incoming student, I want to say whether I stay for one semester or a full year and, if I want, whether I am under 26, so that I see which transport pass and prices fit me.

**Acceptance criteria:**
- [ ] The intake asks whether the student stays for one semester or a full year; the student can change the answer later
- [ ] The intake asks whether the student is under 26 on arrival, with "Prefer not to say" as an option; the answer is optional
- [ ] The transport pass guide shows the passes and prices as a table
- [ ] The table highlights the passes that fit the student's stay and, if given, age; without an age answer it highlights by stay only
- [ ] The facts behind the table are checked against an official source and reviewed by a second team member
- [ ] The answers are stored only on the device, and the app asks for no birth date or exact dates of stay

**Estimate:** 3. **Priority:** P0. **Dependencies:** #5, #6.

> **Definition of Done, point 8,** allowed only EU or non-EU status and arrival date. Length of stay is one semester or a full year and age is optional, so neither is personal data; the team agreed the change at Planning and it is in the [DoD change log](../definition-of-done.md#changes).

## Sprint Goal

> By 2 December, a student can mark steps as done and come back to a timeline that shows what to do now and what is due when, tailored to their status, arrival date, length of stay and (if they want) age, and we have watched at least 3 students in Bolzano use it.

## Selected stories (Sprint Backlog)

| Order | Story | Priority | Points | Depends on |
| --- | --- | --- | --- | --- |
| 1 | #13 Mark steps as done and keep my progress | P0 | 3 | #6 |
| 2 | #11 See which steps are waiting on another step | P0 | 1 | #13 |
| 3 | #12 See my first weeks as a timeline | P0 | 3 | #13 |
| 4 | #76 See the transport pass and prices that fit my stay and age | P0 | 3 | #5, #6 |
| 5 | #20 Clear my data from this device | P1 | 1 | #13 |
| 6 | #14 Test the app with students already in Bolzano | P0 | 3 | #13, #12 |
| 7 | #7 Tax code guide | P0 | 1 | #14 |
| 8 | #9 Transport pass guide | P0 | 1 | #14 |
| 9 | #10 Residence permit guide | P0 | 1 | #14 |
| | **Planned total** | | **17** | |

## Why this amount

- 17 points in one week is more than half of Sprint 1's 19 in two. We think it holds because the base is built: in Sprint 1 the first six days were blocked by the stack decision and the scaffold.
- 4 of the 17 points (#7, #9, #10, #11) close stories that are mostly built: the guides are checked in the user tests, and #11 comes with #13.
- #20 is small and belongs with #13: once we store progress, students should be able to remove it.
- **If we fall behind,** we drop in this order: #20, then the stay and age story. #13, #12 and #14 stay, because they are the interactive core and the user feedback.

## Order of work

| When | What |
| --- | --- |
| Wed 25 Nov | Sprint 2 Planning: confirm goal, stories, owners and the DoD change; create the tasks on the board |
| Thu 26 Nov | Everyone starts their first task in parallel, with a draft PR on the first day. Facts check for stay and age starts. |
| Fri 27 to Sun 29 Nov | Progress summary, waiting steps become available (#11), timeline logic and screen, intake questions, stay and age rules, price table, clear data. |
| Mon 30 Nov to Tue 1 Dec | Last reviews and merges. **Development done on Tue 1 Dec:** every story merged and live on the public URL |
| Wed 2 Dec | User feedback: test sessions with students (#14), including following the guides (#7, #9, #10); findings summary |
| Thu 3 Dec | Sprint Review, Retrospective and the sprint report |

## Task breakdown

Tasks become sub-issues of their story, labelled `task`, in Sprint 2.

### #13 Mark steps as done and keep my progress (3 points)

| Task | Owner |
| --- | --- |
| Sketch the done state and the progress summary | Tom |
| Store done marks in `localStorage` next to the answers (`src/core/progress.ts`, with tests) | Richard |
| Mark and unmark a step on the checklist row and on its guide | Tom, pairing with Adam |
| Show "2 of 5 done" and the next step at the top of the checklist | Adam |

### #11 See which steps are waiting on another step (1 point)

| Task | Owner |
| --- | --- |
| A waiting step becomes available once the steps it needs are done (`toChecklistItems` takes the done marks, with tests) | Richard |

### #12 See my first weeks as a timeline (3 points)

| Task | Owner |
| --- | --- |
| Sketch the timeline at phone and desktop width | Tom |
| Put each step in a phase from today, the arrival date and its deadline; days left and overdue (`src/core/`, with tests) | Laurel |
| Show the checklist as a timeline with the arrival countdown | Tom, pairing with Adam |

### #76 See the transport pass and prices that fit my stay and age (3 points)

| Task | Owner |
| --- | --- |
| Check the facts: which passes and prices fit one semester or a full year, and which depend on being under 26 | Laurel |
| Cross-review the facts | Richard |
| Add the passes as data to the step file and the content check, and pick the passes that fit the student (`src/core/`, with tests) | Richard |
| Add the stay question and the optional age question to the intake and the saved answers | Adam |
| Show the transport passes as a price table in the guide, highlighting the passes that fit the stay and, if given, age | Tom |

### #20 Clear my data from this device (1 point)

| Task | Owner |
| --- | --- |
| A clear action with confirmation, and a short privacy note on what is stored | Adam |

### #14 Test the app with students already in Bolzano (3 points)

This also closes #7, #9 and #10: each test includes following a guide without help, and at least one non-EU student reviews the residence permit guide.

| Task | Owner |
| --- | --- |
| Write the test script: arrival scenario, "what is your next step", time to the checklist (goal under 5 minutes), following the tax code, transport pass and residence permit guides, "would this have helped before you arrived" | Laurel |
| Recruit at least 3 students in Bolzano, at least 1 non-EU, for 2 Dec | Adam, everyone asks their contacts |
| Run the sessions in pairs (one guides, one takes notes) | everyone |
| Write the findings summary in `research/`, with no personal details | Laurel |
| Fix what is unclear in the guides, or add it to the backlog | Richard |
| Update the Product Backlog and Product Vision from the findings | Adam |

### Load per person

| Member | Tasks |
| --- | --- |
| Adam | 6 (2 paired with Tom, plus recruiting) |
| Tom | 6 (2 paired with Adam) |
| Laurel | 5 |
| Richard | 5 |

## Risks

| Risk | What we do |
| --- | --- |
| Stories land on the last day again | Development done on 1 December; dropping order agreed above |
| The facts for stay or age are unclear | Mark them unknown and show the step or the full price table to everyone with a note, as in Sprint 1 |
| Reviews over the weekend | Agree in the WhatsApp group who reviews which PR each day |
| New intake questions conflict with "no personal data" | Stay is one semester or a full year, age is optional; recorded in the DoD |

# Sprint 1 Plan

**Dates:** 11 November to 25 November 2026
**Board:** [M2B Agile Processes](https://github.com/users/adamvalik/projects/1), view "Sprint backlog"
**Repository:** [adamvalik/agile-m2b](https://github.com/adamvalik/agile-m2b)
**Definition of Done:** [definition-of-done.md](../definition-of-done.md)

## Sprint Goal

> By 25 November, an incoming student can open the app on a public link, enter EU or non-EU status and arrival date, and see a personal, ordered checklist of official steps built from facts the team has checked.

This is the smallest increment that shows the core idea of the product end to end and that we can demo and put in front of students in Bolzano. The guides themselves (#7, #9, #10) come next; in Sprint 1 each step either opens a short guide or says the guide is coming.

## Backlog refinement

Before selecting work we reviewed the Product Backlog (26 stories, 45 points in P0). All P0 stories have acceptance criteria, an estimate and their dependencies written down. #28 (sketch the main flow) is in the sprint so that UI work on #5 and #6 starts from one agreed design.

## Selected stories (Sprint Backlog)

| Story | Title | Priority | Points | Depends on |
| --- | --- | --- | --- | --- |
| #28 | Sketch the main flow before we build it | P0 | 3 | none |
| #1 | Open the app on a public link | P0 | 3 | none |
| #2 | Check the facts behind each official step | P0 | 5 | none |
| #4 | Update steps without changing code | P0 | 3 | #1 |
| #5 | Tell the app my situation | P0 | 2 | #1 |
| #6 | See my personal, ordered checklist | P0 | 3 | #2, #4, #5 |
| | **Planned total** | | **19** | |

## Why this amount

- We have no velocity yet, so we plan by dependencies and by what makes a demonstrable increment.
- 19 points is 42% of the 45 P0 points. Spread over three sprints that leaves about 13 points each for Sprints 2 and 3, which also hold user testing (#14).
- #6 is the only story that depends on three others. If #2 runs late we can still finish #6 with dependencies marked unknown, as #2 allows.
- We considered also taking #7 (tax code guide) and #8 (source and last-checked date), 23 points in total, but chose not to overcommit in the first sprint. They are the first candidates for Sprint 2.

## Order of work

1. **Days 1 to 3:** choose the stack (#33) so #1 is unblocked; #28 sketches and #2 fact checks start in parallel.
2. **By the end of week 1:** the app is deployed from `main` (#1), the sketches are agreed (#32), and the content format exists (#43).
3. **Week 2:** intake (#5), loading step files and the field check (#4), then the checklist (#6) once facts are reviewed (#42).
4. **Last two days:** test against acceptance criteria (#54), fix bugs, prepare the Sprint Review demo.

## Task breakdown

Tasks are GitHub sub-issues of their story, labelled `task`, in Sprint 1 on the board. Story points are on stories only.

### #28 Sketch the main flow (3 points)

| Task | Owner |
| --- | --- |
| #29 Sketch the first page and the intake at phone width | Tom |
| #30 Sketch the checklist and its step states | Tom |
| #31 Sketch one guide with its source and last-checked date | Tom |
| #32 Agree on the sketches as a team | Adam |

### #1 Open the app on a public link (3 points)

| Task | Owner |
| --- | --- |
| #33 Choose framework and hosting and record the choice | Adam |
| #34 Scaffold the app with a first page | Adam |
| #35 Deploy main automatically to a public URL | Adam |
| #36 Check the layout at phone and desktop width | Tom |

### #2 Check the facts behind each official step (5 points)

| Task | Owner |
| --- | --- |
| #37 Check the facts for the tax code | Laurel |
| #38 Check the facts for the residence permit | Laurel |
| #39 Check the facts for the transport pass | Richard |
| #40 Check the facts for the SIM card and bank account | Richard |
| #41 Confirm the dependencies between steps | Laurel |
| #42 Cross-review each step's facts | Laurel, Richard |

### #4 Update steps without changing code (3 points)

| Task | Owner |
| --- | --- |
| #43 Define the step content file format | Richard |
| #44 Load step files into the app | Adam |
| #45 Add a check for missing required fields | Laurel |
| #46 Explain in the README how to edit a step | Richard |

### #5 Tell the app my situation (2 points)

| Task | Owner |
| --- | --- |
| #47 Build the intake form | Tom |
| #48 Validate the arrival date | Tom |
| #49 Let the student change their answers | Tom |

### #6 See my personal, ordered checklist (3 points)

| Task | Owner |
| --- | --- |
| #50 Add step files for the five official steps | Laurel |
| #51 Filter and order steps for the student | Richard |
| #52 Show the checklist screen | Tom |
| #53 Update the checklist when answers change | Adam |
| #54 Test the checklist against the acceptance criteria | Laurel |

### Load per person

| Member | Tasks |
| --- | --- |
| Adam | 6 |
| Tom | 8 (several are small UI tasks) |
| Laurel | 7 |
| Richard | 6 |

## Board workflow

Product Backlog → Sprint Backlog → Ready → In progress → In review → Done

A task moves to In review when its pull request or document is open for review, and to Done when it is merged or approved. A story moves to Done only when it meets the [Definition of Done](../definition-of-done.md).

## Risks

| Risk | What we do |
| --- | --- |
| Official sources are unclear or contradict each other (#2) | Mark the fact unknown, note who to ask, and keep going; #6 can use unknown links |
| Stack choice takes too long and blocks #1, #4, #5 | Decide by 13 November; Adam decides if the team is split |
| Tom is on the critical path for both sketches and UI | Sketches first; others can pick up #48 or #49 if needed |

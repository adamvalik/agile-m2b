# Meeting log

Short notes from every team meeting.

Types: Sprint Planning, team sync, Sprint Review, Retrospective, or a topic meeting (for example the sketch walkthrough for #32).

Template for a new entry:

```markdown
## YYYY-MM-DD, <type> (HH:MM–HH:MM)

**Attended:** ...

### Discussed and decided
- ...

### Next steps
| Who | What | Issue |
| --- | --- | --- |
```

---

## 2026-11-25, Sprint 2 Planning (13:30–14:00)

**Attended:** Adam, Laurel, Tom, Richard

Full plan: [sprint-2-plan.md](sprint-2-plan.md)

### Discussed and decided

- **Timeline:** five weeks for three sprints, so Sprint 2 is one week (26 Nov to 2 Dec) and Sprint 3 runs 3 to 16 Dec. Development done on 1 Dec, user tests on 2 Dec, Review, Retrospective and report on 3 Dec.
- **Refinement:** most of #7 to #12 was built with the checklist screen. #7, #9 and #10 close with the user tests (#14); #8 is done; #11 comes with #13; #12 is rewritten as a timeline. New story: steps and prices that fit the student's length of stay and optionally age.
- **Sprint Goal:** "By 2 December, a student can mark steps as done and come back to a timeline that shows what to do now and what is due when, tailored to their status, arrival date, length of stay and (if they want) age, and we have watched at least 3 students in Bolzano use it."
- **Selected stories:** #13 (3), #11 (1), #12 (3), stay and age (3), #20 (1), #14 (3), #7, #9, #10 (1 each). **17 story points planned.** If we fall behind, we drop #20 first, then the stay and age story.

### Next steps

| Who | What | Issue |
| --- | --- | --- |
| Adam | Create the new stories and tasks on the board, update the sprint dates and the DoD | |
| everyone | Start the first task with a draft PR on 26 Nov | |
| Laurel | Check the facts for stay and age; write the test script | #14 |

---

## 2026-11-24, Sprint 1 Retrospective (13:00–13:30)

**Attended:** Adam, Laurel, Tom, Richard

Full notes: [sprint-1-retrospective.md](sprint-1-retrospective.md)

### Discussed and decided

- **Went well:** all 19 points delivered and the full flow works on the live app; thorough reviews of the facts; CI with the content check and a preview link for every PR.
- **Difficulties:** the stack decision slipped from 13 to 16 November, so app work started in the second week; PRs waited days for review; the user-facing stories (#5, #6) were merged on the last morning; no feedback from users yet.
- **Collaboration:** reviews were thorough but slow to start; one sync in the middle of the sprint; Tom carried all UI work; on the board, stories and their tasks blend together, so story progress was hard to see.
- **Planning:** 19 points planned, 19 closed. About half the points closed in the last two days.
- **Improvements for Sprint 2:** make stories stand out on the board (`story` label, task board grouped by parent issue, a "Stories" view); test the next iteration with students at the end of Sprint 2 (#14); enforce reviews in the repository (ruleset on `main`: one approval and passing checks; CODEOWNERS requests reviewers automatically) and review within one working day.
- **Definition of Done:** minor documentation changes, and documents that record a decision the team already agreed on, can be merged without a review; recorded in the change log of [definition-of-done.md](../definition-of-done.md).

### Next steps

| Who | What | Issue |
| --- | --- | --- |
| Adam | Set up the `story` label and the board views (label added to all stories on 24 Nov) | |
| Adam | Set up the ruleset on `main` and CODEOWNERS, and document them in CONTRIBUTING.md (ruleset active since 24 Nov) | |
| everyone | Review requested PRs within one working day | |

---

## 2026-11-24, Sprint 1 Review (12:30–13:00)

**Attended:** Adam, Laurel, Tom, Richard

Full notes: [sprint-1-review.md](sprint-1-review.md)

### Discussed and decided

- **Demo:** showed the full flow on the [live app](https://m2b-agile.vercel.app/): first page, intake, personal checklist, and a guide with its source and last-checked date.
- **Accepted stories:** #1, #2, #28, #4, #5, #6: 19 of 19 points
- **Sprint Goal:** fully met, all stories were completed by the definition of done.
- **Feedback:** no user testing in Sprint 1, because the full flow was ready only on the review day; testing with students (#14) is planned for the end of Sprint 2, on the next iteration. Team feedback: the core works, but the app is too simple, like a blog post with five static guides and little personalisation. Accepted: we revise the Product Backlog.
- **Product Backlog changes:** direction from a static checklist to an interactive companion: progress, a timeline with deadlines, more personalisation, help at the office, and steps beyond the official ones (#12, #13, #15, #16, #23 to #26). Stories are written and estimated in a refinement before Sprint 2 planning. Parts of #7 to #12 are already built and get re-estimated.

### Next steps

| Who | What | Issue |
| --- | --- | --- |
| everyone | Refine the Product Backlog: new stories for the themes, re-estimate #7 to #12 | |
| Adam | Write the Sprint 1 deliverable report | |
| everyone | Sprint 2 planning | |

---

## 2026-11-17, team sync (13:00–13:30)

**Attended:** Adam, Laurel, Tom, Richard

### Discussed and decided

- **Pull request reviews:** went through the open pull requests together and resolved the open reviews.
- **Next work:** aligned on what each of us does next (below).
- **Schedule for the rest of Sprint 1:** agreed as below.

### Schedule for the rest of Sprint 1

| When | What |
| --- | --- |
| Tue 17 Nov (today) | Review the open pull requests and merge them by the end of the day |
| Wed 18 to Fri 20 Nov | Work through the remaining Sprint 1 issues by Friday |
| Sat 21 to Sun 22 Nov | Review the pull requests |
| Start of next week (from Mon 23 Nov, sprint ends Wed 25 Nov) | Sprint Review, Retrospective, and work on the Sprint 1 deliverable |

### Board after the meeting

| Status | Tasks |
| --- | --- |
| Done | #33 stack decision, #43 content format |
| In review | #34 scaffold and #35 deploy ([PR #62](https://github.com/adamvalik/agile-m2b/pull/62)); #37 tax code facts ([PR #60](https://github.com/adamvalik/agile-m2b/pull/60)); #38 residence permit facts ([PR #61](https://github.com/adamvalik/agile-m2b/pull/61)); #39 transport pass and #40 SIM and bank facts ([PR #58](https://github.com/adamvalik/agile-m2b/pull/58), changes requested) |
| In progress | #29, #30, #31 sketches; #41 step dependencies; #42 cross-review of facts |

### Next steps

| Who | What | Issue |
| --- | --- | --- |
| Adam | Get PR #62 reviewed and merged, put the public URL in the README | #34, #35 |
| Adam | Organise the sketch walkthrough once the sketches are ready | #32 |
| Tom | Finish the sketches; check the layout on the preview link | #29, #30, #31, #36 |
| Laurel | Confirm the dependencies between steps; get PRs #60 and #61 merged | #41, #37, #38 |
| Richard | Address the requested changes on PR #58 | #39, #40 |
| Laurel, Richard | Cross-review each step's facts | #42 |

---

## 2026-11-11, Sprint 1 Planning (13:30–15:30, during the lab)

**Attended:** Adam, Laurel, Tom, Richard

### Discussed and decided

- **Backlog refinement:** reviewed the Product Backlog from Deliverable 2 (26 user stories, 45 points in P0) and aligned it on the GitHub Projects board "M2B Agile Processes". Every P0 story has acceptance criteria, an estimate and its dependencies written down.
- **Sprint Goal:** "By 25 November, an incoming student can open the app on a public link, enter EU or non-EU status and arrival date, and see a personal, ordered checklist of official steps built from facts the team has checked."
- **Selected stories:** #28 sketch the main flow (3), #1 public link (3), #2 check the facts (5), #4 steps as content files (3), #5 intake (2), #6 personal checklist (3). **19 story points planned.** We considered also taking #7 and #8 (23 points) but chose not to overcommit in the first sprint; they are the first candidates for Sprint 2.
- **Sprint Backlog and tasks:** broke the six stories into 26 tasks (#29 to #54), each a sub-issue of its story with an owner, and put them in Sprint 1 on the board.
- **Order of work:** the stack decision (#33) first, by 13 November, so the app can be scaffolded; sketches (#28) and fact checks (#2) in parallel.
- **Definition of Done:** agreed the initial version ([definition-of-done.md](../definition-of-done.md)).
- **Board workflow:** Product Backlog → Sprint Backlog → In progress → In review → Done.

### Next steps

| Who | What | Issue |
| --- | --- | --- |
| Adam | Propose framework and hosting, decide by 13 November | #33 |
| Tom | Sketch the first page, intake, checklist and one guide | #29, #30, #31 |
| Laurel | Check the facts for the tax code and residence permit | #37, #38 |
| Richard | Check the facts for the transport pass, SIM card and bank account; define the step file format | #39, #40, #43 |

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

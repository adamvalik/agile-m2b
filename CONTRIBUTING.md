# Contributing

## Commit message format

This repository uses [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must look like this:

```
<type>(optional scope): <short description>

optional body

optional footer
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Examples:

```
docs: add competitor research
docs(research): summarize interview findings
feat: add arrival checklist prototype
fix: correct residence permit steps
chore: update team table in README
```

Rules in short: lowercase type, a colon and a space, then a short description that does not end with a period. Keep the first line under 100 characters.

## One-time setup

You need Node.js 22.22.3+ or 24.15+ installed (Angular 22 requires it; the repository pins 24 in `.nvmrc`). With nvm, run `nvm install` in the repository folder. Then run once:

```bash
npm install
```

This installs the tooling and automatically activates the commit hook (husky). From then on, every `git commit` is checked and a message in the wrong format is rejected with an explanation. Nothing else is needed.

To test it:

```bash
git commit --allow-empty -m "bad message"            # rejected
git commit --allow-empty -m "chore: test the hook"   # accepted (undo with: git reset --soft HEAD~1)
```

If you use a Git GUI and the hook does not run, make sure Node.js is available to the GUI, or commit from the terminal.

## Pull requests

`main` is protected by a ruleset (**Settings → Rules → Rulesets → main**). A pull request can be merged only when:

- **one other team member has approved it.** Your own approval does not count. A new commit after the approval dismisses it, so the reviewer approves again.
- **the required checks pass:** `check` (content check, tests and build) and `commitlint` (commit messages). The `deploy` job gives the preview link but is not required.

Nobody can push to `main` directly, force-push to it, or delete it.

**Reviewers are requested automatically.** [.github/CODEOWNERS](.github/CODEOWNERS) lists the whole team, so every pull request asks the other three for a review. One approval from any of them is enough; agree in the PR or on WhatsApp who takes it. Review within one working day.

**Merging without a review.** The [Definition of Done](definition-of-done.md#merging-without-a-review) allows it for minor documentation changes and for documents that record something the team already agreed on elsewhere. The pull request then says why it needs no review and where it was agreed, and the repository admin (Adam) merges it with "bypass rules". Code, step files in `content/` and research facts always need an approval.

If the `commitlint` check fails because of an old commit message, rewrite it:

```bash
git rebase -i origin/main    # mark the wrong commits as "reword"
git push --force-with-lease
```

Please do not bypass the local hook with `--no-verify`.

## Issues and the board

The backlog and the sprint board are the GitHub project [M2B Agile Processes](https://github.com/users/adamvalik/projects/1).

- **Stories** are issues labelled `story`, written with the template "User story", "Acceptance criteria" and "Dependencies". They carry the Priority (P0 to P2) and the Estimate in story points.
- **Tasks** are sub-issues of their story, labelled `task`, each with one owner. Tasks have no points.
- **Sprint board view:** filtered to `label:task` and grouped by Parent issue, so each story is a row with its tasks moving across the Status columns.
- **Stories view:** a table filtered to `label:story`, with Sub-issues progress, Estimate, Priority, Sprint and Status.
- **Status of a story:** In progress when its first task starts; Done when it meets the Definition of Done and is accepted at the Sprint Review.
- A task moves to In review when its pull request is open, and to Done when the pull request is merged.

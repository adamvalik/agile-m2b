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

You need Node.js (version 20 or newer) installed. Then, in the repository folder, run once:

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

Every pull request is checked by GitHub Actions (`commitlint` workflow), which validates all commit messages in the PR. A PR with a wrongly formatted commit cannot be merged once the check is marked as required.

If the check fails because of an old commit message, rewrite it:

```bash
git rebase -i origin/main    # mark the wrong commits as "reword"
git push --force-with-lease
```

Please do not bypass the local hook with `--no-verify`.

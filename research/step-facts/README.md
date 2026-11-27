# Step facts

Checked facts behind each official step in the checklist (#2). Each file records the requirements, routes, sources and a last-checked date. The step files in `content/` (#50) are written from these facts.

| Step id | File | Applies to | Issue | Researched by | Reviewed by |
|---|---|---|---|---|---|
| `tax-code` | [tax-code.md](tax-code.md) | EU, non-EU | #37 | Laurel | Richard (#60) |
| `residence-permit` | [residence-permit.md](residence-permit.md) | non-EU | #38 | Laurel | Richard (#61) |
| `transport-pass` | [transport-pass.md](transport-pass.md) | EU, non-EU | #39 | Richard | Laurel (#58) |
| `sim-card` | [sim-card.md](sim-card.md) | EU, non-EU (optional) | #40 | Richard | Laurel (#58) |
| `bank-account` | [bank-account.md](bank-account.md) | EU, non-EU (optional) | #40 | Richard | Laurel (#58) |
| stay and age rules | [stay-and-age.md](stay-and-age.md) | which steps and passes fit the length of stay and age | #85 | Laurel | _pending (Richard, #86)_ |

The five step files were last checked on 2026-11-17; `stay-and-age.md` on 2026-11-26.

## Dependencies between steps

Issue #41. Last checked 2026-11-17. Researched by Laurel. Reviewed by _pending (Richard, see #42)_.

Every link the team assumed (in the desk research, competitor research or a fact file), and what the sources say. Statuses:

- **confirmed:** an official source says the later step needs the earlier one
- **corrected:** the assumption was wrong; the row says what is true instead
- **unknown:** not settled by an official source; it stays as an open question

The numbers in brackets refer to the sources list in the fact file named in the Source column.

### Links between the five steps

| # | Step | Needs | For | Status | What the sources say | Source |
|---|---|---|---|---|---|---|
| 1 | `transport-pass` | `tax-code` | all | **confirmed** | U26, Fix365 and Flex Pass all require "a valid Italian tax code". The Euregio Ticket Students page (students under 28) does not mention one; this does not change the order, since the main passes need it. | transport-pass.md [1][5][6][8][10] |
| 2 | `bank-account` | `tax-code` | all | **confirmed** | The unibz Exchange Students' Guide and every bank checked list the tax code for opening an account. | bank-account.md [7][8][10][11][14] |
| 3 | `bank-account` | `residence-permit` | non-EU | **confirmed** | The unibz Exchange Students' Guide asks non-EU students for the permit or the post office receipt for the permit application; the Italian Banking Association guide mentions the permit. So the permit application is enough; the card itself is not needed. | bank-account.md [12][14] |
| 4 | `sim-card` | `tax-code` | all | **corrected to unknown** | The law asks only for an identity document and does not mention the tax code. Operators often ask for it anyway. | sim-card.md [2][3][4] |
| 5 | `sim-card` | `residence-permit` | non-EU | **corrected** | Not needed: the law accepts a passport as an alternative to the permit. | sim-card.md [2] |
| 6 | `transport-pass` | `residence-permit` | non-EU | **unknown** | The U26 Pass is for people living in the EU or Switzerland, or resident in the province. The Italian and German pages say "habitual residence", which might cover a student living in Bolzano for a semester, but that is our reading. Whether the permit or its receipt is needed to order any pass is not stated. The Flex Pass is open to anyone who studies in South Tyrol. | transport-pass.md [1][5][6][7], open questions 1 and 4 |
| 7 | `transport-pass` | `bank-account` | all | **corrected** | Not needed: the pass can be paid by Visa, Mastercard or pagoPA. | transport-pass.md [1] |
| 8 | `tax-code` | `residence-permit` | non-EU | **unknown** | For study stays over 90 days the code is normally assigned by the Questura with the permit application. Whether non-EU exchange students can, or must, get it from the Agenzia delle Entrate first is not stated. | tax-code.md [1][10][12], open question 2 |
| 9 | `residence-permit` | `tax-code` | non-EU | **corrected** | Not needed: the national kit list for study permits does not ask for a tax code (the one for work permits does), and the code is assigned through the permit application. | residence-permit.md [1][3][7] |
| 10 | `bank-account` | `sim-card` | all | **unknown** | Not checked whether banks need an Italian phone number (for example for security codes). | sim-card.md open question 4 |
| 11 | `transport-pass` | `sim-card` | all | **unknown** | The südtirolmobil portal asks for an email address; whether an Italian number is needed is not stated. | transport-pass.md [1]; sim-card.md open question 4 |
| 12 | `sim-card` | `bank-account` | all | **unknown** | Depends on the offer and payment method; no source found. | sim-card.md (Dependencies) |

### Preconditions that are not steps in the app

These are needed but are not separate checklist steps, so they belong in each guide's "bring" list rather than in `requires`.

| Step | Needs | For | Status | Source |
|---|---|---|---|---|
| `tax-code` | passport or ID card | all | **confirmed** | tax-code.md [1][2] |
| `tax-code` | passport with visa (if required), plus proof of the right to stay | non-EU | **confirmed** | tax-code.md [1] |
| `tax-code` | an in-person appointment at the Agenzia office (for foreigners), or the consulate route from home | all | **confirmed**; PEC, email and delegate routes are disputed | tax-code.md [1][2][11][12] |
| `residence-permit` | study visa, unibz enrolment certificate, health insurance stamped by the embassy, proof of accommodation with the host's ID, proof of means of support | non-EU | **confirmed** | residence-permit.md [1][3][7] |
| `transport-pass` | ID card or passport (copy for the Flex Pass) | all | **confirmed** for the Flex Pass; team experience for the U26 Pass | transport-pass.md [6] |
| `bank-account` | passport, enrolment certificate or self-declaration | all | **confirmed** | bank-account.md [14] |
| `sim-card` | identity document | all | **confirmed** | sim-card.md [2] |

### Assumptions from earlier research that change

| Assumption | Where | Verdict |
|---|---|---|
| "Without a tax code there is no SIM card, no bank account, no rental contract and no transport pass." | desk-research.md | **Partly corrected.** Confirmed for the transport pass and bank account (rows 1, 2). Not confirmed for the SIM card (row 4). The rental contract is outside the five steps and was not checked; student reports say landlords ask for it (W1, W2, W4 in the coding sheet). |
| "Banks also ask non-EU students for the permit receipt." | desk-research.md | **Confirmed** (row 3): unibz accepts the permit or the receipt. |
| "Some Agenzia delle Entrate offices give it to non-EU students only once their visa is valid." | desk-research.md (University of Florence guide) | **Confirmed in substance:** the Agenzia asks non-EU citizens for a passport with visa, if one is required. The Bolzano practice is not documented. |
| Chain "codice fiscale → SIM → bank → transport pass → residence permit" | competitor-research-2.md | **Corrected.** It is not a chain. The SIM card is not confirmed as needed for the bank or the pass, and the pass does not need the bank (rows 7, 10, 11). The residence permit does not come last: for non-EU students it has an 8-working-day deadline, so it comes first, and it does not need the tax code (row 9). |
| The transport pass needs the tax code (team knowledge, no official link). | desk-research.md | **Confirmed** with an official link (row 1). |

## What this means for the checklist order (#51)

Only **confirmed** links set the order. Unknown links are shown to students as hints at most, never as firm requirements (as the step schema says), and **#51 must never use them for ordering**.

**EU students**

1. `tax-code` (can start from home)
2. `transport-pass` (needs the tax code)
3. `bank-account`, optional (needs the tax code)
4. `sim-card`, optional (no confirmed prerequisite, so it can be done any time)

**Non-EU students**

1. `residence-permit`: deadline of 8 working days, so it goes first even though nothing confirmed comes before it
2. `tax-code`
3. `transport-pass` (needs the tax code; eligibility for the U26 Pass is unknown, row 6)
4. `bank-account`, optional (needs the tax code and the permit application, since the receipt is accepted)
5. `sim-card`, optional

For students of 26 or older the U26 Pass is not available, and the options differ (transport-pass.md [6][8][10]):

- **EU students:** Fix365, Flex Pass or Euregio Ticket Students (under 28).
- **Non-EU students:** the Fix365 is for EU or Swiss residents or people who **work** in South Tyrol; studying does not count, so it runs into the same residence question as row 6. The options open to them are the Flex Pass ("work or study in South Tyrol") and the Euregio Ticket Students (under 28, enrolled at a Euregio university, no residence rule).

This changes the guide text, not the order.

## Notes for the step files (#50)

- **Links that apply to non-EU students only** (row 3) can be written in `requires` without extra fields: `residence-permit` only applies to non-EU students, so for EU students the app should ignore a `requires` entry that points to a step not on their checklist. #51 needs to handle this.
- **Corrected links** (rows 5, 7, 9) are left out of `requires`.
- **Unknown links** (rows 4, 6, 8, 10, 11) go in with `"status": "unknown"`, so they can be confirmed later without changing code. They are hints only: the checklist order (#51) uses confirmed links alone.
- **No loops, not even through unknown links.** Rows 10 and 12 point in opposite directions (the bank account might need a SIM card, the SIM card might need a bank account). Both are unknown, but writing both would make a loop, and the content check (#45) rejects any loop in `requires`. Only row 10 goes into the step files: a bank asking for an Italian phone number (for example for security codes) is the more likely of the two. Row 12 stays in the table as an open question and is added to `requires` only if a source confirms it and row 10 turns out wrong.
- **Residence permit deadline:** 8 working days from entry into Italy, by law (residence-permit.md [9]). Use `"countsFrom": "arrival"`. Only the unibz guide counts from the Schengen area, so the guide text should still advise applying in the first days.

Suggested `requires` per step:

| Step | `requires` |
|---|---|
| `tax-code` | `residence-permit` (unknown) |
| `residence-permit` | none |
| `transport-pass` | `tax-code` (confirmed), `residence-permit` (unknown), `sim-card` (unknown) |
| `bank-account` | `tax-code` (confirmed), `residence-permit` (confirmed), `sim-card` (unknown) |
| `sim-card` | `tax-code` (unknown) |

These links contain no loop.

The schema file is [content/step.schema.json](../../content/step.schema.json).

## Open questions

Only the questions that affect links between steps; each fact file has its own full list.

1. Can non-EU exchange students get the tax code from the Agenzia delle Entrate before the Questura assigns it with their permit? (row 8; tax-code.md question 2, residence-permit.md question 5; ask the unibz International Relations Office)
2. Can a non-EU student without registered residence in the province get the U26 Pass, and does ordering need the permit or its receipt? (row 6; transport-pass.md questions 1 and 4; ask the südtirolmobil Service Desk)
3. Do SIM shops in Bolzano sell to students without a tax code? (row 4; sim-card.md question 1)
4. Do banks or the südtirolmobil portal need an Italian phone number? (rows 10, 11; sim-card.md question 4)

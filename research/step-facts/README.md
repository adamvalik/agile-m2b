# Step facts

Checked facts behind each official step in the checklist (#2). Each file records the requirements, routes, sources and a last-checked date. The step files in `content/` (#50) are written from these facts.

| Step id | File | Applies to | Issue | Status |
|---|---|---|---|---|
| `tax-code` | [tax-code.md](tax-code.md) | EU, non-EU | #37 | in review (#60) |
| `residence-permit` | [residence-permit.md](residence-permit.md) | non-EU | #38 | in review (#61) |
| `transport-pass` | [transport-pass.md](transport-pass.md) | EU, non-EU | #39 | in review (#58) |
| `sim-card` | [sim-card.md](sim-card.md) | EU, non-EU (optional) | #40 | in review (#58) |
| `bank-account` | [bank-account.md](bank-account.md) | EU, non-EU (optional) | #40 | in review (#58) |

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
| 1 | `transport-pass` | `tax-code` | all | **confirmed** | U26, Fix365 and Flex Pass all require "a valid Italian tax code". | transport-pass.md [1][6][8] |
| 2 | `bank-account` | `tax-code` | all | **confirmed** | Every bank checked asks for the tax code; the unibz Exchange Students' Guide lists it for opening an account. | bank-account.md [7][8][10][11]; tax-code.md [14] |
| 3 | `bank-account` | `residence-permit` | non-EU | **confirmed** | Banks ask non-EU citizens for a residence permit; the unibz Exchange Students' Guide accepts the permit or the post office receipt. | bank-account.md [12]; tax-code.md [14] |
| 4 | `sim-card` | `tax-code` | all | **corrected to unknown** | The law asks only for an identity document and does not mention the tax code. Operators often ask for it anyway. | sim-card.md [2][3][4] |
| 5 | `sim-card` | `residence-permit` | non-EU | **corrected** | Not needed: the law accepts a passport as an alternative to the permit. | sim-card.md [2] |
| 6 | `transport-pass` | `residence-permit` | non-EU | **unknown** | The U26 Pass is for people living in the EU or Switzerland, or resident in the province. Whether a non-EU student without registered residence qualifies is not stated. The Flex Pass is open to anyone who studies in South Tyrol. | transport-pass.md [1][5][6] |
| 7 | `transport-pass` | `bank-account` | all | **corrected** | Not needed: the pass can be paid by Visa, Mastercard or pagoPA. | transport-pass.md [1] |
| 8 | `tax-code` | `residence-permit` | non-EU | **unknown** | For study stays over 90 days the code is normally assigned by the Questura with the permit application. Whether non-EU exchange students can, or must, get it from the Agenzia delle Entrate first is not stated. | tax-code.md [1][10][12] |
| 9 | `residence-permit` | `tax-code` | non-EU | **corrected** | Not needed: the study permit kit does not ask for a tax code, and the code is assigned through the permit application. | residence-permit.md [1][3] |
| 10 | `bank-account` | `sim-card` | all | **unknown** | Not checked whether banks need an Italian phone number (for example for security codes). | sim-card.md open question 4 |
| 11 | `transport-pass` | `sim-card` | all | **unknown** | The südtirolmobil portal asks for an email address; whether an Italian number is needed is not stated. | transport-pass.md [1]; sim-card.md open question 4 |

### Preconditions that are not steps in the app

These are needed but are not separate checklist steps, so they belong in each guide's "bring" list rather than in `requires`.

| Step | Needs | For | Status | Source |
|---|---|---|---|---|
| `tax-code` | passport or ID card | all | **confirmed** | tax-code.md [1][2] |
| `tax-code` | passport with visa (if required), plus proof of the right to stay | non-EU | **confirmed** | tax-code.md [1] |
| `residence-permit` | study visa, unibz enrolment certificate, health insurance stamped by the embassy, proof of accommodation with the host's ID, proof of means of support | non-EU | **confirmed** | residence-permit.md [1][3][7] |
| `transport-pass` | ID card or passport (copy for the Flex Pass) | all | **confirmed** for the Flex Pass; team experience for the U26 Pass | transport-pass.md [6] |
| `bank-account` | passport, enrolment certificate or self-declaration | all | **confirmed** | tax-code.md [14] |
| `sim-card` | identity document | all | **confirmed** | sim-card.md [2] |

### Assumptions from earlier research that change

| Assumption | Where | Verdict |
|---|---|---|
| "Without a tax code there is no SIM card, no bank account, no rental contract and no transport pass." | desk-research.md | **Partly corrected.** Confirmed for the transport pass and bank account (rows 1, 2). Not confirmed for the SIM card (row 4). The rental contract is outside the five steps and was not checked; student reports say landlords ask for it (W1, W2, W4 in the coding sheet). |
| "Banks also ask non-EU students for the permit receipt." | desk-research.md | **Confirmed** (row 3). |
| "Some Agenzia delle Entrate offices give it to non-EU students only once their visa is valid." | desk-research.md (University of Florence guide) | **Confirmed in substance:** the Agenzia asks non-EU citizens for a passport with visa, if one is required. The Bolzano practice is not documented. |
| Chain "codice fiscale → SIM → bank → transport pass → residence permit" | competitor-research-2.md | **Corrected.** It is not a chain. The SIM card is not needed for the bank or the pass (rows 7, 10, 11). The residence permit does not come last: for non-EU students it has an 8-working-day deadline, so it comes first, and it does not need the tax code (row 9). |
| The transport pass needs the tax code (team knowledge, no official link). | desk-research.md | **Confirmed** with an official link (row 1). |

## What this means for the checklist order (#51)

Only **confirmed** links set the order. Unknown links are not shown to students as firm requirements (as the step schema says).

**EU students**

1. `tax-code` (can start from home)
2. `transport-pass` (needs the tax code)
3. `bank-account`, optional (needs the tax code)
4. `sim-card`, optional (no confirmed prerequisite, so it can be done any time)

**Non-EU students**

1. `residence-permit`: deadline of 8 working days, so it goes first even though nothing confirmed comes before it
2. `tax-code`
3. `transport-pass` (needs the tax code; eligibility for the U26 Pass is unknown, row 6)
4. `bank-account`, optional (needs the tax code and the permit or its receipt)
5. `sim-card`, optional

## Notes for the step files (#50)

- **Links that apply to non-EU students only** (row 3) can be written in `requires` without extra fields: `residence-permit` only applies to non-EU students, so for EU students the app should ignore a `requires` entry that points to a step not on their checklist. #51 needs to handle this.
- **Corrected links** (rows 5, 7, 9) are left out of `requires`.
- **Unknown links** (rows 4, 6, 8, 10, 11) go in with `"status": "unknown"`, so they can be confirmed later without changing code.
- **Residence permit deadline:** 8 working days from entry into Italy, by law (residence-permit.md [9]). Use `"countsFrom": "arrival"`. Only the unibz guide counts from the Schengen area, so the guide text should still advise applying in the first days.

Suggested `requires` per step:

| Step | `requires` |
|---|---|
| `tax-code` | `residence-permit` (unknown) |
| `residence-permit` | none |
| `transport-pass` | `tax-code` (confirmed), `residence-permit` (unknown), `sim-card` (unknown) |
| `bank-account` | `tax-code` (confirmed), `residence-permit` (confirmed), `sim-card` (unknown) |
| `sim-card` | `tax-code` (unknown) |

## Open questions

1. Can non-EU exchange students get the tax code from the Agenzia delle Entrate before the Questura assigns it with their permit? (row 8; ask the unibz International Relations Office)
2. Can a non-EU student without registered residence in the province get the U26 Pass? (row 6; ask the südtirolmobil Service Desk)
3. Do SIM shops in Bolzano sell to students without a tax code? (row 4)
4. Do banks or the südtirolmobil portal need an Italian phone number? (rows 10, 11)

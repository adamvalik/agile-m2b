# Stay and age: facts behind the rules

| | |
|---|---|
| Rules | which steps depend on the length of stay; which transport passes and prices depend on age |
| Issue | #85 (part of #76) |
| Last checked | 2026-11-26 |
| Researched by | Laurel |
| Reviewed by | _pending (Richard, #86)_ |

Story #76 adds two intake questions: whether the student stays longer than three months, and (optionally) whether they are under 26. This file records what the official sources say about each rule the app builds on those answers. Statuses: **confirmed** (an official source says so), **unknown** (not settled by an official source).

## Summary for the rules

| # | Rule in the app | Status | Source |
|---|---|---|---|
| 1 | The residence permit appears only for non-EU students staying **longer than three months** | **confirmed** | [1][2] |
| 2 | Non-EU students staying three months or less make a **declaration of presence** instead | **confirmed**; not a step in the app yet, see Rule 2 | [2] |
| 3 | Non-EU students staying three months or less get the tax code at the Agenzia delle Entrate, not through the permit | **confirmed** | `tax-code.md` [10][12] |
| 4 | Under 26: the **U26 Pass** (€153 for 365 days, €21 for 30 days) | **confirmed** | [3][7][8] |
| 5 | Under 28 and enrolled at a university in the Euregio: the **Euregio Ticket Students** (€377 a year) | **confirmed** | [6][8] |
| 6 | The Fix365, Fix30 and Flex passes have **no age rule** and no under-26 price | **confirmed** | [4][5][7] |
| 7 | A stay of exactly three months, counted as about 90 days | **unknown** at the edge, see Rule 1 | [1][2] |
| 8 | Whether a U26 Pass bought at 25 stays valid after the 26th birthday | **unknown** | [3] |

All prices match `transport-pass.md` (checked 2026-11-17). Nothing changed since then.

## Rule 1: the residence permit needs a stay longer than three months

- The Polizia di Stato page on the permit says that foreigners who come for visits, business, tourism "e studio per periodi non superiori ai tre mesi" do not need to request a residence permit. [1]
- The page on the declaration of presence says the same in days: stays "non superiore a 90 giorni" for study, among other reasons, need no permit; the declaration of presence is enough. [2]
- "Not exceeding three months" means a stay of exactly three months needs no permit; only a longer one does. This matches the intake question "Do you stay longer than three months?". The page does not spell out the exact-three-months case, so this is our reading of "non superiori". [1]
- **Edge case, unknown:** the two pages give the limit as three months and as 90 days, and three calendar months can be 89 to 92 days. Neither page says which counts. A stay that ends right around three months should be checked with the unibz International Relations Office. Most exchange semesters are clearly longer, so this affects few students.
- Students at Italian branches of foreign universities (art. 38-bis of the immigration law) may stay up to 150 days without a permit. [2] This does not apply to unibz exchange students, who are enrolled at unibz.
- EU students need no permit in any case (`residence-permit.md`).

**For the step files (#87):** `residence-permit` keeps `appliesTo: ["non-eu"]` and adds the condition "stays longer than three months". No other step depends on the length of stay in the sources checked: the tax code, transport pass, SIM card and bank account apply to every stay. Only the route to the tax code differs (Rule 3).

## Rule 2: shorter stays need a declaration of presence

Non-EU students staying three months or less still have one official duty. [2]

- **Arriving directly from outside the Schengen area:** the declaration "si intende assolta" (counts as done) when the border police put the Schengen stamp in the passport. Nothing more to do.
- **Arriving through another Schengen country** (for example a flight via Frankfurt or Vienna): declare presence to the Questura of the province **within 8 days of entering Italy**, on a form.
- **Staying in a hotel:** the hotel files the declaration within 24 hours of arrival.
- **If the declaration is late:** the prefect can order expulsion, unless the delay was due to force majeure. [2]

> **For the team:** once the residence permit is hidden for short stays, a short-stay non-EU student sees no official step for their status. The declaration of presence is not in story #76. We suggest a new backlog story, or at least a note on the checklist for non-EU students staying three months or less. Who handles it in Bolzano (Questura immigration office or a police station) is not stated on the page.

## Rule 3: the tax code for shorter stays

- The Italian Ministry of Foreign Affairs and the Embassy in Berlin say: for a study stay under 90 days, non-EU students get the tax code at any Agenzia delle Entrate office; over 90 days, it comes with the permit application at the Questura. (`tax-code.md` [10][12])
- So the open link "`tax-code` needs `residence-permit`" (row 8 in [README.md](README.md)) only matters for stays longer than three months. For shorter stays, the Agenzia route in the tax code guide is the one that applies.

## Rule 4 to 6: transport passes and age

### Which passes depend on age

| Pass | Age rule (exact wording) | Price | Other conditions | Source |
|---|---|---|---|---|
| U26 Fix365 | "everyone under 26"; order "at least one day before your 26th birthday" | €153, 365 days from issue | live in the EU or Switzerland, or resident in the province; Italian tax code; no enrolment needed | [3][7] |
| U26 Fix30 | as above | €21, 30 days from issue | as above | [3][7] |
| Euregio Ticket Students | "under the age of 28 at the time of applying" | €377 a year, since 1 April 2026 | enrolled at a university in Tyrol, South Tyrol or Trentino; no residence or tax code rule stated | [6] |
| U19 | "under 19 years of age at the time of application" | €21, until 15 September of the following year | tax code; EU or Swiss residence, or habitual residence in the province | [9] |
| 65+ | for seniors | | not relevant for students | [8] |

### Passes without an age rule

| Pass | Price | Who can get it | Source |
|---|---|---|---|
| Fix365 | €250 a year; monthly from €39 | EU or Swiss residents, or people who work in South Tyrol; tax code | [4][7] |
| Flex | pay per km, at most €22 a day and €650 a year | EU or Swiss residents, or people who **work or study** in South Tyrol; tax code | [5] |

Neither page shows a cheaper price for under 26. [4][5]

### Notes for the price table (#89)

- **Under 26 = yes:** highlight the U26 Fix365 and U26 Fix30. The Euregio Ticket Students also fits (under 28), but costs more and covers a larger area. Keep the note "order at least one day before your 26th birthday".
- **Under 26 = no:** highlight the Flex Pass and the Fix365 Pass. The Euregio Ticket Students fits only if the student is under 28; we do not ask that, so show it with "if you are under 28" rather than highlighting it.
- **Prefer not to say, or no answer:** the full table, nothing highlighted.
- **Non-EU students** fit the Fix365 only if they work in South Tyrol, and the U26 only if "resident in the province" covers them (open question 1 in `transport-pass.md`). The Flex Pass is open to anyone who studies in South Tyrol. [3][4][5] The price table should keep the "who can get it" column rather than highlight by age alone.
- **The U19** fits only students under 19, so few exchange students. Leave it out of the table, or show it in a footnote.

### The intake question and the U26 rule

- The rule depends on the age **when ordering**, not on arrival: the order must be placed at least one day before the 26th birthday. [3] A student who arrives at 25 and turns 26 before ordering cannot get it.
- Suggestion for #88: keep "Are you under 26?" in the intake, and keep the birthday note in the guide. The app still asks for no birth date.

### Unknown and conflicting

- **Validity after the 26th birthday (unknown):** the U26 page says the pass is valid 365 days from issue, and ties the age only to ordering. It doesn't say whether a pass bought at 25 stays valid after the 26th birthday, or whether it can be renewed. [3] (Ask the Service Desk, +39 0471 220 880.)
- **Cross-border trains (conflict):** the general Fix365 page says the under-26 offer is "valid on the entire public transport network" [7]; the U26 page excludes the cross-border trains to Innsbruck and Lienz, the Nightliner, and long-distance trains. [3] The general page mentions offers "available from July 2025" and looks older, so we keep the U26 page.
- **2026 price list:** the ticket finder links a 2026 price list (PDF, file dated 2026-10-12). [10] We could not extract its text, so the prices above come from the pass pages only.

## Personal data

- Length of stay is asked as a yes or no range, and age as an optional yes or no. Neither is a birth date or exact dates of stay, so the rules above need nothing more. Definition of Done point 8 still needs the change agreed at Planning (see `sprints/sprint-2-plan.md`).

## Open questions

1. Is a stay of exactly three months (or 90 days) counted with or without a permit? (Ask the International Relations Office.)
2. Where in Bolzano do short-stay non-EU students arriving through another Schengen country make the declaration of presence? (Ask the Questura.)
3. Does a U26 Pass bought before the 26th birthday stay valid for the full 365 days? (Ask the südtirolmobil Service Desk.)
4. Can exchange students enrolled at unibz for one semester get the Euregio Ticket Students? (Already open as question 2 in `transport-pass.md`.)

## Sources

1. Polizia di Stato – Il rilascio del permesso di soggiorno (IT, modified 2024-01-05), checked 2026-11-26: https://www.poliziadistato.it/articolo/225
2. Polizia di Stato – Dichiarazione di presenza per cittadini stranieri (IT, modified 2021-01-26), checked 2026-11-26: https://www.poliziadistato.it/articolo/31013
3. südtirolmobil – südtirolmobil U26 Pass (EN), checked 2026-11-26: https://www.altoadigemobilita.info/en/tickets/ticket-finder/suedtirolmobil-u26-pass
4. südtirolmobil – südtirolmobil Fix365 Pass, checked 2026-11-26: https://www.suedtirolmobil.info/en/tickets/ticket-finder/suedtirolmobil-fix365-pass
5. südtirolmobil – südtirolmobil Flex Pass, checked 2026-11-26: https://www.suedtirolmobil.info/en/tickets/ticket-finder/suedtirolmonil-flex-pass
6. südtirolmobil – Euregio Ticket Students, checked 2026-11-26: https://suedtirolmobil.info/en/tickets/ticket-finder/euregio-ticket-students
7. südtirolmobil – südtirolmobil passes (Fix365 overview), checked 2026-11-26: https://www.suedtirolmobil.info/en/tickets/fix365
8. südtirolmobil – Ticket finder, checked 2026-11-26: https://www.suedtirolmobil.info/en/tickets/ticket-finder
9. südtirolmobil – südtirolmobil U19 Pass, checked 2026-11-26: https://www.suedtirolmobil.info/en/tickets/ticket-finder/suedtirolmobil-u19-pass
10. südtirolmobil – Price list 2026 (PDF, file dated 2026-10-12), text could not be extracted on 2026-11-26: https://www.suedtirolmobil.info/fileadmin/Preisliste_2026_EN.pdf

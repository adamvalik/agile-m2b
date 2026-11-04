# Product Vision

[google doc](https://docs.google.com/document/d/1L6-HeLMX6RdtprxNkDkOW8ecM0Oht3TPd9M58Gcq8Vs/edit?usp=sharing)

## Problem statement

Incoming students at unibz have a lot to figure out in their first weeks: official steps, daily life in a bilingual city, and finding people and activities. The hardest part we see so far is finding out what to do, and doing it in time and in the right order.

The official steps include the tax code (codice fiscale), SIM card, bank account and transport pass, plus the residence permit for non-EU students. The information exists, but it is spread across websites, offices, a PDF guide, Orientation Day and student chat groups. Official pages are often available only in Italian or German.

Practical knowledge about daily life, such as where to find things and who to do activities with, mostly lives in chat groups and leaves with each group.

The cost is lost time and money in the first weeks, repeated office visits and stress. For non-EU students the stakes are higher, because the residence permit has a deadline soon after arrival.

## Intended users and stakeholders

Our primary users are incoming exchange students at unibz, from the moment they are accepted until they have settled in during their first weeks.

| Group | Role |
| --- | --- |
| Incoming EU students | Primary user |
| Incoming non-EU students | Primary user, highest stakes |
| unibz International Relations Office | Key stakeholder, possible content partner |
| Organizers of Orientation Day | Stakeholder |
| Current and earlier exchange students, ESN and student groups | Source of knowledge, test participants |
| Course teaching staff | Project stakeholder |
| Team M2B | Builders |

## Evidence and observations

We did some research: 5 student interviews and 44 responds on a survey. They all point to the same need, although the local sample is small and includes only one non-EU interview.

- **Timing matters:** students who arranged the tax code from home had no delay, while those who found out on arrival waited up to 2 weeks and had no transport pass meanwhile.
- **Scattered advice:** students rely on many sources, and peers pass on wrong tips as well as useful ones.

Other observations:

- **A growing group:** unibz has a record 196 incoming exchange students this winter semester, and about 300 a year ([l'Adige, Oct 2026](https://www.ladige.it/progetti/unibz-wird-immer-internationaler-so-viele-austauschstudierende-wie-noch-nie-sgsitjmm)).
- **Life beyond paperwork:** everyday places seem easy to find, but social connection needs a closer look: in a Europe-wide survey, 54.67% of exchange students joined no local activity ([ESNsurvey 2021](https://www.eaie.org/resource/understanding-international-student-needs.html)).

## Proposed product and value

We want to build an interactive web app that helps incoming students at unibz through their first weeks in Bolzano, with what they need in one place.

The final shape is still open. We start with the need that has the strongest support so far.

| Idea | What it would help with |
| --- | --- |
| Adaptive checklist with step-by-step guides | Official steps, in time and in the right order |
| Language help | Italian-only pages and offices |
| Interactive map with layers | Finding places and services, such as sports facilities |
| Activity groups | Finding people for sports and other activities |
| Tips from earlier students | Keeping practical knowledge between groups |

**Value by group:**

- **Students** learn in time what to do next, what can wait, and what to start before leaving home.
- **Non-EU students** see their deadline and extra requirements in the same place, in the right order.
- **Students without Italian** get help where language blocks them: booking pages and offices.
- **All students** could settle in faster by finding places, activities and people more easily (to validate).

**What exists today:**

| Type | Examples | Strength | Gap for unibz students |
| --- | --- | --- | --- |
| Personal roadmap tools | [Paris-Saclay Online Welcome Desk](https://mobile.universite-paris-saclay.fr/sites/default/files/2023-07/pr_upsaclay_online_welcome_desk.pdf), [Sorbonne International Welcome Desk](https://www.sorbonne-universite.fr/en/international-0/international-welcome-desk) | Order of admin steps, by phase or situation | Built for their own institutions |
| Erasmus-wide platforms | [Erasmus+ App](https://erasmusapp.eu/), [Erasmus Play](https://apps.apple.com/nl/app/erasmus-play/id6446317577), [Erasmusu](https://erasmusu.com/en/erasmus-bolzano/erasmus-experiences) | Checklists, housing, community | Generic, or with old Bolzano content |
| Social platforms | [Goin'](https://www.uio.no/english/studies/international-students/before-arrival/goin/index.html) | Connections and interest groups before arrival | Mainly social, sold to universities, and unibz does not appear to use it |
| Other university guides | [NCU OnBoard](https://portal.umk.pl/en/article/ncu-onboard-welcome-aboard), [VU Amsterdam](https://vu.nl/en/education/more-about/onboarding-international-students) | Official steps plus daily life | Cover only their own university and city |
| unibz information | Exchange guide (PDF), web pages, Orientation Day | Local and trusted | Static or one-off, and not personal |
| Local peers | Exchange Students unibz, ESN, buddies, WhatsApp and Telegram groups | Fast, personal, strong on events | Scattered, sometimes wrong, and lost with each group |
| AI chatbots | General-purpose assistants | Helped one interviewed student through an Italian booking page | Accuracy on local procedures is unknown |

Existing tools tend to focus on either administration or community, and we found none that is both interactive and specific to unibz and Bolzano. That is the gap we want to fill, alongside official information rather than replacing it. Paris-Saclay's desk is the closest example to study.

## Product Goal

**Every incoming student at unibz can find, in one interactive place, what they need to settle into their first weeks in Bolzano, starting with which official steps apply to them, in what order, and how to complete each one.**

## Initial MVP scope

The MVP starts with problem areas 1 and 2 from our brainstorm, official steps that depend on each other and information that arrives too late, because they have the strongest support so far.

**In scope:**

- A short intake: EU or non-EU, arrival date (saved without an user account)
- A personal, ordered checklist that starts with the tax code and transport pass, adds the residence permit for non-EU students, and treats SIM card and bank account as optional
- A short step-by-step guide for each task, including common mistakes such as going to the tax office without an appointment
- A clear signal of which tasks to start from home, which have a deadline, and which need other steps first
- Marking tasks as done

**Ideas to explore next:**

- An interactive map with switchable layers, such as sports facilities and services, offering what Google Maps does not
- Groups for finding people to join activities, such as different sports, adding something beyond ESN events and WhatsApp groups
- Tips from earlier student groups, with a way to catch wrong or outdated advice

**Out of scope for now:**

- Completing official procedures on the student's behalf
- Integration with unibz or government systems
- A native mobile app

## Functional and non-functional expectations

Correct information is the most important expectation.

**Functional:**

- The checklist adapts to EU or non-EU status and to the arrival date.
- Tasks appear in dependency order, and each shows what it requires first.
- Each task has a guide covering what to bring, where to go and what comes next.
- Students can mark tasks as done and see what remains.
- Each guide links to its official source and explains any page that is only in Italian or German.

**Non-functional:**

| Quality | Expectation |
| --- | --- |
| Reliability of content | Each guide shows its source and the date it was last checked |
| Maintainability | Content can be updated without code changes, so it survives beyond one student intake |
| Extensibility | New features, such as a map or activity groups, can be added without rebuilding what exists |
| Usability | A first-time user gets a checklist in a few minutes, in plain English, with no knowledge of Italian bureaucracy |
| Mobile | Works well on a phone, because students may use it while out in the city |
| Accessibility | Meets common web accessibility guidelines (target level to agree) |
| Privacy | Collects only what each feature needs; never asks for documents, tax codes or passport numbers |

## Key assumptions and constraints

The riskiest assumption is that students discover the app before they arrive: if they find it too late, like the information they miss today, much of its value is lost. We cannot test this directly, because we can only test with students already here.

| Assumption | Support so far |
| --- | --- |
| Students can be reached before arrival | None yet |
| Knowing earlier solves most of the official-step problem | Good for the tax code, weak for the residence permit, where the procedure itself is hard |
| Students want more than official steps, such as a map or activity groups | Unclear so far |
| Students would choose this over group chats and AI chatbots | Unknown; students already combine several sources |
| EU or non-EU status and arrival date are enough to adapt the checklist | Partial; language, visa timing and length of stay also seem to matter |
| The steps are stable enough to document | Doubtful; a student said the pass is in-person only while the operator's page says online, and the pass was recently renamed |

**Constraints:**

- **Team:** four people
- **Delivery:** a web app, managed with Git, GitHub and GitHub Projects.
- **Time:** a course project done by Christmas, 3 Sprints of 2 weeks each.
- **Content:** we have no official authority over these procedures and must point students to official sources.
- **Access:** no assumed access to unibz systems or student data.
- **Testing:** we can test only with students already in Bolzano, not with students who have yet to arrive.

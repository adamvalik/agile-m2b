# Design

**Source of truth:** the Figma file [M2B screens](https://www.figma.com/design/4kKphPuniMJTSjhTzqHr6O). The PNGs here are exported snapshots.

## Phone

![Phone screens](00-overview-mobile.png)

## Desktop

![Desktop screens](00-overview-desktop.png)

## Screens

| Screen                         | Phone                                                                          | Desktop                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| 01 First page                  | [mobile/01-first-page.png](mobile/01-first-page.png)                           | [desktop/01-first-page.png](desktop/01-first-page.png)                           |
| 02 Intake                      | [mobile/02-intake.png](mobile/02-intake.png)                                   | [desktop/02-intake.png](desktop/02-intake.png)                                   |
| 03 Intake with missing answers | [mobile/03-intake-errors.png](mobile/03-intake-errors.png)                     | [desktop/03-intake-errors.png](desktop/03-intake-errors.png)                     |
| 04 Checklist, EU student       | [mobile/04-checklist-eu.png](mobile/04-checklist-eu.png)                       | [desktop/04-checklist-eu.png](desktop/04-checklist-eu.png)                       |
| 05 Checklist, non-EU student   | [mobile/05-checklist-non-eu.png](mobile/05-checklist-non-eu.png)               | [desktop/05-checklist-non-eu.png](desktop/05-checklist-non-eu.png)               |
| 06 Step states                 | [mobile/06-step-states.png](mobile/06-step-states.png)                         | [desktop/06-step-states.png](desktop/06-step-states.png)                         |
| 07 Tax code guide              | [mobile/07-guide-tax-code.png](mobile/07-guide-tax-code.png)                   | [desktop/07-guide-tax-code.png](desktop/07-guide-tax-code.png)                   |
| 08 Checklist with steps done   | [mobile/08-checklist-done.png](mobile/08-checklist-done.png)                   | [desktop/08-checklist-done.png](desktop/08-checklist-done.png)                   |
| 09 Guide: mark as done         | [mobile/09-guide-mark-as-done.png](mobile/09-guide-mark-as-done.png)           | [desktop/09-guide-mark-as-done.png](desktop/09-guide-mark-as-done.png)           |
| 10 Guide: done                 | [mobile/10-guide-done.png](mobile/10-guide-done.png)                           | [desktop/10-guide-done.png](desktop/10-guide-done.png)                           |
| 11 Timeline, before arrival    | [mobile/11-timeline-before-arrival.png](mobile/11-timeline-before-arrival.png) | [desktop/11-timeline-before-arrival.png](desktop/11-timeline-before-arrival.png) |
| 12 Timeline, after arrival     | [mobile/12-timeline-after-arrival.png](mobile/12-timeline-after-arrival.png)   | [desktop/12-timeline-after-arrival.png](desktop/12-timeline-after-arrival.png)   |

### Screens 08 to 12 (#77, #82)

The example is a non-EU student arriving on Mon 1 March 2027.

- **Marking a step done:** a checkbox in place of the state icon. Tapping the box marks the step done, tapping the row opens its guide; the badge carries the state. A done step stays in place, collapsed to one line with the "Done" badge.
- **Progress summary:** a card at the top shows "x of 3 required steps done" with the progress bar, and the next step with a link to its guide.
- **Guide:** "Mark as done" sits under the facts (in the side column on desktop). Once marked, a "Done" message with "Undo" takes its place.
- **Timeline:** a line joins the phases "Before you travel", "In your first week" and "Later or when you need it", with today and the arrival day as points on it. Before the arrival date it shows the countdown; after it, the before-arrival part is gone, and after the first week "In your first week" becomes "Since you arrived". A deadline shows its date and the days left; a step past its deadline gets the "Overdue" badge.

## Design system

- **Kit:** [spartan/ui for Figma](https://www.figma.com/community/file/1691576794328156128/spartan-ui-for-figma-a-1-1-design-kit-of-spartan-ng), a 1:1 kit of the spartan/ui Angular components. Every screen is built from its components (Button, Item, Badge, Alert, Checkbox, Field Set, Field, Radio Group, Date Picker, Progress, Card, Separator), text styles and variables, so Figma's Dev Mode shows the matching Angular code.
- **Theme:** neutral main colour (Accent "Default"), Style "Nova", light mode. The colour palette is decided later; changing it is one variable mode.
- **Status colours:** the 700 shades of the kit's Tailwind palette, only on the status badges and icons, so small text on them passes WCAG AA (4.5:1): "Done" green-700 (about 5:1), "Due" amber-700 (about 5:1), "Overdue" text red-700 on its light red badge (about 5.4:1). In code: `bg-green-700`, `bg-amber-700` (already used for "Due"), `text-red-700`.
- **Font:** Geist, the kit's font. The app loads it from the `@fontsource-variable/geist` package, so no font request goes to another server.
- **M2B changes to the kit:** listed on the "Design system" page of the Figma file and matched in the code.
  - **Checkbox:** the empty box has a darker border, `muted-foreground` at 80 % instead of `input`, about 3.2:1 against white (the outline of a control needs 3:1, WCAG 1.4.11). Figma: the "M2B/Checkbox" component. Code: `libs/ui/checkbox` (`border-muted-foreground/80`). Where it is used, the tap area around the 16 px box is at least 24 px (WCAG 2.5.8), with a wrapping label or padding.
  - **Alert with a button:** the text keeps room on the right, so it never runs under the button: 72 px for "Open" (`pe-18` in the code), more for a wider button such as "Undo".
- **Desktop layout:** one centred column of 640 px; the intake form sits in a card of 560 px; the step states are a two-column grid; the guide moves the official source, facts and sources into a side column. Tablet widths use the same centred column.

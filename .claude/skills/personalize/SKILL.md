---
name: personalize
description: Write a version of each campaign email for every vendor group in warehouse_data/vendors.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a vendor campaign for each vendor group

You write one version of every email in a vendor campaign for each vendor group, so each group reads an email that fits its own work.

## 1. Check the campaign folder

The campaign folder is: $ARGUMENTS

- **If no folder was given,** stop. Use Glob to list the folders in `vendor_campaigns/` that have an `emails/` folder, show them as a short list, and tell the user to run `/personalize <campaign folder>`. Write nothing.
- **If the folder has no `emails/` folder, or no `.md` files in it,** stop and say so. Write nothing.

## 2. Find the vendor groups

Read `warehouse_data/vendors.csv` and collect the distinct values in the `vendor_group` column. Don't use a fixed list: if a group is added or removed in the CSV, follow the CSV. Today the groups are:

| vendor_group | Folder name |
|---|---|
| high-volume freight carriers | `high-volume-freight-carriers` |
| local LTL couriers | `local-ltl-couriers` |
| packaging supply vendors | `packaging-supply-vendors` |

The folder name is the group name in lowercase, with spaces turned into hyphens.

## 3. Write one version per email per group

Read every `.md` file in `<campaign folder>/emails/`. For each email and each group, write a version to:

`<campaign folder>/groups/<folder name>/emails/<same file name>`

### Keep exactly the same
- The `Subject:` line and the `Preview:` line
- The structure: same sections, in the same order
- The one main link, word for word, including its button text
- The automated sign-off and the two-line footer, word for word, as plain text
- Every `{{placeholder}}`, such as `{{first_name}}`, `{{company_name}}`, `{{company_address}}` and `{{preferences_url}}`
- Every fact and date: system name, setup time, end date, reply time

### Change only these
1. **The opening line** (the first sentence after the greeting), so it speaks to that group's work.
2. **One example**, so it fits the group:
   - **High-volume freight carriers:** pickups, bill of lading (BOL) and proof of delivery (POD) upload, fitting it into their dispatch routine
   - **Local LTL couriers:** pickup times, delivery status and POD, working from a phone's web browser
   - **Packaging supply vendors:** advance shipping notices (ASNs) and requesting dock appointments
   - A group not listed here: use what that group sends Apex, based on the campaign's `plan.md`

### Group paragraphs and notes
- If an email has one paragraph per group (marked with HTML comments such as `<!-- Group A (...) -->`), keep only that group's paragraph and delete the other paragraphs and all the group label comments.
- Keep the send-notes comment after the Preview line, but add a first line `Version: <vendor_group>` and remove the instruction about keeping one group paragraph, since that's now done.
- Change the `To:` line in the send notes so it names only that group, and end it with "only". Keep any other condition in it. For example, `To: all 150 active vendors (groups A, B and C)` becomes `To: group B, local LTL couriers (70 vendors) only`, and `To: vendors who have NOT activated their account yet (all groups)` becomes `To: vendors who have NOT activated their account yet (group B, local LTL couriers only)`. A group version must never say it goes to all vendors.

### Rules that still apply
- `.claude/rules/emails.md`: subject 50 characters or fewer, preview 90 or fewer, one main link, sign-off and footer last.
- `operations_notes/voice_guidelines.md`: exact dates, no hype, no guarantees, no unconfirmed facts. Spell out an abbreviation the first time it appears.
- Never add a fact that isn't in the original email or in the campaign's `plan.md`. If a group needs a fact that isn't there, keep the general wording instead.

## 4. Reply with a short summary only

When all the files are written, reply with only:
- how many files you wrote (emails × groups), and the folder they're in
- one example opening line per group

Don't paste the full emails.

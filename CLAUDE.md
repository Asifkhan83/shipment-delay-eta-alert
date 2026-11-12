# CLAUDE.md

This file guides Claude Code when working in this folder.

## What this studio is for

This is a Logistics and Warehouse Email Automation Studio, run with Claude Code. It is for three kinds of work:

- automating logistics emails, such as shipment delay and ETA alerts to customers
- vendor outreach
- warehouse operations reporting

Two documents set its direction:

- `README.md` is the main business use case: a **Shipment Delay and ETA Alert System**. When the TMS detects a revised ETA beyond the agreed delivery window, customers get an email with the original ETA, the revised ETA, the verified reason (from an authorized operational source only) and the corrective action. Critical delays escalate to the operations manager, and a follow-up email goes out when the shipment is back on schedule.
- `ASSIGNMENT.md` is the 15-step course we follow, in order. It has a progress checklist at the top. Every step goes: build prompt → `/exit` and a fresh `claude` session → check prompt. A check session must never change files. Tick a step's checkbox only after its check passes.

The course was written for a sample brand (Kettlebird Tea / The Steep Club). All 15 steps in `ASSIGNMENT.md` are rewritten for Apex Transit, so run them as written. Steps 1–5 show the prompts we actually ran. If a prompt still mentions the sample, confirm with the user before adapting it.

## Course adaptation

This studio adapts the course to Apex Transit Solutions. The table "How this course maps to my project" at the top of `ASSIGNMENT.md` shows which course files and names match which files here (for example, `leads/leads.csv` → `warehouse_data/vendors.csv`). Use it when adapting a step's prompt, and add a row to it when a new step decides a new file or name.

## Delay alert requirements

From `README.md`. Any delay alert we write or automate must follow these:

1. **Trigger:** send an alert only when the TMS reports a revised ETA beyond the agreed delivery window.
2. **Required content:** every alert states the original ETA, the revised ETA, the reason, and the corrective action.
3. **Reason:** use only a reason from an authorized operational source, and name the source. If there's no verified reason, say the cause is being confirmed. Never guess.
4. **Escalation:** critical delays also go to the operations manager as an internal email.
5. **Follow-up:** send a back-on-schedule email when the shipment is on track again.

The voice guide below also applies: no guaranteed times, no refunds or credits in automated emails, and the automated sign-off.

## Practice vendor data

- `warehouse_data/vendors.csv` holds 24 made-up vendor contacts, 8 in each of three groups: high-volume freight carriers, local LTL couriers and packaging supply vendors. `warehouse_data/vendors.md` is a readable copy, so keep the two in step.
- `warehouse_data/CLAUDE.md` has extra rules for that folder only: no real people or real emails, every row needs a consent value, and never change the `@example.com` addresses.

## Folders

- `warehouse_data/` — sample warehouse and shipment data (stock levels, orders, ETAs) used as input. Copies only, never live databases.
- `dispatch_emails/` — customer-facing logistics emails, such as delay alerts, ETA updates and back-on-schedule follow-ups.
- `vendor_campaigns/` — outreach emails and sequences for vendors, carriers and suppliers.
- `operations_notes/` — warehouse operations reports, summaries and internal notes.
- `notes/` — course notes, such as which skills were chosen.

## Voice

All emails follow the communication and email voice guide below.

@operations_notes/voice_guidelines.md

## Tooling

The project has Anthropic's `operations` and `sales` plugins installed at project scope (see `.claude/settings.json`). There's no build, lint or test tooling yet. Node.js 22+ is the only runtime the course uses (for the hook in `.claude/hooks/` and `scripts/review.mjs`). The plan's "Your studio at the end" tree shows the target layout.

## Rules

- Write in plain English.
- Never send actual emails autonomously. Never send email to real people. Practice leads use `@example.com` addresses only. From Step 9 on, Resend sends go only to `@resend.dev` test addresses or the user's own `MY_EMAIL`.
- Never modify live warehouse databases autonomously.
- Ask before deleting anything.
- Never state a delay reason that didn't come from an authorized operational source.

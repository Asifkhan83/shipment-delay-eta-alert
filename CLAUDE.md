# CLAUDE.md

This file guides Claude Code when working in this folder.

## What this studio is for

This is a Logistics and Warehouse Email Automation Studio, run with Claude Code. It is for three kinds of work:

- automating logistics emails, such as shipment delay and ETA alerts to customers
- vendor outreach
- warehouse operations reporting

Two documents set its direction:

- `README.md` is the main business use case: a **Shipment Delay and ETA Alert System**. When the TMS detects a revised ETA beyond the agreed delivery window, customers get an email with the original ETA, the revised ETA, the verified reason (from an authorized operational source only) and the corrective action. Critical delays escalate to the operations manager, and a follow-up email goes out when the shipment is back on schedule.
- `EMAIL-STUDIO-LAB-PLAN.md` is the 15-step course we follow, in order. It has a progress checklist at the top. Every step goes: build prompt → `/exit` and a fresh `claude` session → check prompt. A check session must never change files. Tick a step's checkbox only after its check passes.

The course's prompts use a sample brand (Kettlebird Tea / The Steep Club). Before running a step's build prompt, confirm with the user whether to use the sample or adapt it to the shipment-delay use case.

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

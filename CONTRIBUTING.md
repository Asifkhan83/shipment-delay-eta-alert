# How to use this repo

This guide is for anyone who clones or works in this repository. It explains what the repo is, how to set it up, how work is done here, and the rules everyone must follow.

## What this repo is

A **Logistics and Warehouse Email Automation Studio** for Apex Transit Solutions (a sample company, used for practice), run with Claude Code. It is used for:

- customer delay alerts, ETA updates and back-on-schedule emails (see `README.md`)
- vendor outreach campaigns
- warehouse operations reports

All data here is made up. No email in this repo is ever sent to a real person.

## Before you start

You need:

- **Node.js 22 or newer** (`node --version`)
- **Git** (`git --version`). On Windows, use Git for Windows, because Claude Code uses its Git Bash.
- **Claude Code** (`npm install -g @anthropic-ai/claude-code`), signed in on first run

## Set up

1. Clone the repo and open Claude Code in it:

   ```bash
   git clone <repo-url>
   cd shipment-delay-eta-alert
   claude
   ```

2. Create your personal settings file from the template. It is git-ignored, so it stays on your machine:

   ```bash
   cp .claude/settings.local.example.json .claude/settings.local.json
   ```

   Then set `MY_EMAIL` in it to your own email address. The send guard lets email go only to this address and to `@resend.dev` test addresses.

3. Approve the project plugins (`operations`, `sales`, `marketing`) and the `resend` MCP server when Claude Code asks.

4. To send practice emails, start the local practice email server in a second terminal and leave it open:

   ```bash
   npx emulate@0.12.3 start --service resend
   ```

   Wait until it shows `http://localhost:4000`. No Resend account is needed for practice mode.

Live mode (a real Resend account) is optional. Follow `notes/resend-live-setup.md`. Never put an API key in any file in this repo.

## Where things live

| Folder or file | What goes there |
|---|---|
| `README.md` | The main use case: the Shipment Delay and ETA Alert System |
| `ASSIGNMENT.md` | The 15-step course, with a progress checklist at the top |
| `CLAUDE.md` | Rules Claude Code follows in this repo |
| `operations_notes/voice_guidelines.md` | The voice guide every email must follow |
| `warehouse_data/` | Made-up input data, such as `vendors.csv` (24 practice vendors). Has its own `CLAUDE.md` |
| `dispatch_emails/` | Customer emails: delay alerts, ETA updates, back-on-schedule follow-ups |
| `vendor_campaigns/` | Vendor outreach plans and email sequences |
| `operations_notes/` | Internal reports and notes |
| `notes/` | Course notes and setup guides |
| `.claude/` | Hooks, rules, skills and shared settings for Claude Code |

## How work is done

Work follows the steps in `ASSIGNMENT.md`, in order. Each step has three parts:

1. **Build.** Paste the step's build prompt into Claude Code.
2. **Fresh session.** Type `/exit`, then run `claude` again.
3. **Check.** Paste the step's check prompt. The check session reviews the work and **must not change any files**.

Tick a step's checkbox in `ASSIGNMENT.md` only after its check passes.

When a step introduces a new file or name, add a row to the table "How this course maps to my project" in `ASSIGNMENT.md`.

## Rules everyone must follow

### Email safety

- Never send real emails to real people.
- Practice contacts use `@example.com` addresses only. Never change them.
- Sending through Resend is allowed only to `@resend.dev` test addresses and to your own `MY_EMAIL`. The hook `.claude/hooks/send-guard.mjs` blocks every other recipient. Don't disable or weaken it.

### Secrets

- Never commit API keys, tokens or `.env` files. `.gitignore` and `.claude/settings.json` block them; keep it that way.
- Keep secrets in user-level environment variables (see `notes/resend-live-setup.md`), not in the repo and not in chat.
- If a key leaks, delete it in the provider's dashboard and make a new one.

### Data

- `warehouse_data/` holds copies and made-up data only. Never connect to or change a live warehouse database.
- No real people or real emails in data files. Every vendor row needs a consent value.
- Keep `warehouse_data/vendors.csv` and `warehouse_data/vendors.md` in step: change one, change both.

### Delay alerts

Every delay alert must follow these five requirements:

1. **Trigger:** send only when the TMS (transport management system) reports a revised ETA beyond the agreed delivery window.
2. **Content:** state the original ETA, the revised ETA, the reason and the corrective action.
3. **Reason:** use only a reason from an authorized operational source, and name the source. If there is none yet, say the cause is being confirmed. Never guess.
4. **Escalation:** critical delays also go to the operations manager as an internal email.
5. **Follow-up:** send a back-on-schedule email when the shipment is on track again.

### Writing emails

- Follow `operations_notes/voice_guidelines.md`: factual, calm, clear.
- No guaranteed delivery times. No refunds or credits in automated emails. No promises on behalf of a carrier or vendor.
- End every automated email with the automated sign-off from the voice guide, never a person's name.
- Vendor campaign email files must also follow `.claude/rules/emails.md` (subject and preview lengths, one main link, sign-off, footer, placeholders).
- Write in plain English.

## Git workflow

- Make small commits with a clear message that says what changed and why, for example `Add delay alert template for critical shipments`.
- Before committing, run `git status` and check that no secret or personal file is staged.
- For shared work, use a branch and open a pull request rather than pushing straight to `main`.
- Ask before deleting files.

## Getting help

- Course steps: `ASSIGNMENT.md`
- Email voice: `operations_notes/voice_guidelines.md`
- Resend setup: `notes/resend-live-setup.md`
- Or ask Claude Code inside the repo. It reads `CLAUDE.md` and follows the same rules.

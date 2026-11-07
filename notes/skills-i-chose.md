# Skills I chose

For our Logistics and Warehouse Email Automation Studio. Searched skills.sh on 2026-11-08 with:
`logistics automation`, `warehouse operations`, `vendor email sequence`, `email automation`.
Nothing has been installed yet.

**What the searches showed:** no trusted publisher has a skill made for logistics. The searches
for "logistics automation" and "vendor email sequence" found only copies with 1–8 installs.
The strong results were general email and operations skills. Logistics details such as ETAs,
delay reasons and escalation will come from our own studio files, not from a downloaded skill.

## Use these

1. **Anthropic's `knowledge-work-plugins`** (github.com/anthropics/knowledge-work-plugins, ~35,100 stars, official Anthropic account, updated 2026-11-07).
   - The **operations** plugin has skills that fit our work: `vendor-review`, `runbook`, `process-doc`, `status-report`, `risk-assessment` and `change-request`.
   - The **marketing** plugin has `email-sequence`, `campaign-plan` and `brand-review`, which the course uses in Steps 2–7. They work just as well for writing dispatch and vendor emails.
   - Why: official publisher, very popular, actively maintained, and it installs as a plugin we can limit to this project.

2. **Resend's own skills** (`resend/resend-skills@resend`, 24.3K installs, made by the official Resend account, updated 2026-11-06).
   - Covers sending email through Resend, which is the service we connect in Steps 9–11. It also includes `email-best-practices`.
   - Why: when a company publishes the skill for its own product, it is the most reliable source for how that product works. The repo has only ~211 stars, but that's fine here because the publisher itself is verified.

## Avoid these

1. **`zaddy6/agent-email-skill@agent-email-cli`**: 2.1K installs, but its GitHub repo has only **6 stars** and is owned by a personal account.
   That gap is the classic warning sign: install counts can be pumped up, but stars and a known publisher are much harder to fake. An email-sending skill can reach real inboxes, so the bar is high.

2. **The `4pl-director` / `warehouse-lean` copies** (e.g. `smithery.ai@4pl-director`, `majiayu000/claude-skill-registry@4pl-director`, `donnigami/eddication.io@4pl-director`): the same skill is re-posted under 4+ different owners, each with 1 install.
   With so many copies we can't tell which one is the original or who maintains it. Each copy could also have been changed. The same goes for `jonfdag-dot/...@warehouse-operations` (2 installs, 5 stars) and `heymoezy/porter@logistics-optimizer` (0 stars).

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Prefer the official owner of the tool (anthropics, resend) or a well-known organisation over an anonymous personal account or a registry of re-posted copies.
2. **Whether stars match installs.** Thousands of installs with only a handful of GitHub stars is a red flag. Also check that the repo was updated recently.
3. **What it actually does.** Open the `SKILL.md` and any scripts before installing. Check which tools it asks for, and make sure it can't send email or run commands you didn't expect.

## Note for the check step

The search still lists `coreyhaines31/marketingskills@email-sequence` (55.1K installs, repo ~59K stars).
But that repo's `skills/` folder now has only `emails` and `cold-email`, so it looks like
`email-sequence` was **merged into `emails`**. If we ever want that source, install `emails`, not `email-sequence`.

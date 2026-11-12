---
paths:
  - "vendor_campaigns/**/emails/*.md"
---

# Rule for every vendor campaign email file

This rule applies to every email file in any vendor campaign, and only to email files. Every email file must follow all five points below.

1. **Subject and preview come first.** Line 1 is `Subject: ...` and the subject text is 50 characters or fewer. Line 2 is `Preview: ...` and the preview text is 90 characters or fewer. Count the characters. Don't guess.

2. **Greet the reader by name.** The greeting uses the `{{first_name}}` placeholder, for example `Hi {{first_name}},`.

3. **Exactly one main link.** The email has one main link, written exactly like this, with the button text changed to fit the email:

   [Button text](https://apextransit.example/dispatch-setup)

   No other links in the body.

4. **The automated sign-off.** The email ends with the automated sign-off from `operations_notes/voice_guidelines.md` (section 5), as plain text:

   — Apex Transit Solutions Dispatch Team
   This update was sent automatically from our tracking system.
   Questions? Reply to this email or call (555) 010-0000 (Mon–Fri, 7 am–7 pm).

5. **The footer comes last.** Straight after the sign-off, the email ends with this two-line footer. Write it as plain text, not inside a code block:

   You're getting this because you're a registered Apex Transit Solutions vendor.
   Apex Transit Solutions, {{company_address}} · Email preferences: {{preferences_url}}

The voice guide still applies to everything in between: exact dates, no hype, no guarantees, and placeholders instead of unverified facts.

**Placeholders and send notes (drafts only):**

- A missing fact is written as `[what it is: confirm with operations]`, for example `[setup time: confirm with operations]`. Use the same placeholder name for the same fact in every email, and a different name for a different fact.
- A sentence that is only true if operations confirms it is wrapped as `[If confirmed: ...]`.
- Send notes (send date, audience, what to delete) go in one HTML comment `<!-- ... -->` straight after the Preview line. Group labels are HTML comments too.
- Before an email is sent, every placeholder is filled in or removed, and every HTML comment is deleted.

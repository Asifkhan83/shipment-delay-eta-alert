// PreToolUse hook: blocks Resend tool calls that could email the wrong people.
// Allowed recipients: addresses ending in @resend.dev, or the MY_EMAIL env var.
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

const BLOCK_ALWAYS = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`send-guard: ${reason}\n`);
  process.exit(2);
}

// Accept a string or an array; split "a@x.com, b@y.com" lists and
// pull the address out of "Name <addr>" forms.
function addressesFrom(value) {
  if (value == null) return [];
  const list = (Array.isArray(value) ? value : [value])
    .flatMap((v) => String(v).split(/[,;]/))
    .map((s) => s.trim())
    .filter(Boolean);
  return list.map((s) => {
    const m = s.match(/<([^>]+)>/);
    return (m ? m[1] : s).trim().toLowerCase();
  });
}

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

const tool = String(call.tool_name ?? "").replace(/^mcp__resend__/, "");
const input = call.tool_input ?? {};

if (BLOCK_ALWAYS.has(tool)) {
  block(`${tool} is not allowed here because it can reach whole lists of people.`);
}

if (CHECK_RECIPIENTS.has(tool)) {
  const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();
  const emails = tool === "send-batch-emails" ? input.emails : [input];
  if (!Array.isArray(emails)) {
    block("could not find the list of emails in this batch, so it was blocked to be safe.");
  }

  for (const email of emails) {
    for (const field of ["to", "cc", "bcc"]) {
      for (const addr of addressesFrom(email?.[field])) {
        const ok = addr.endsWith("@resend.dev") || (myEmail !== "" && addr === myEmail);
        if (!ok) {
          block(`${addr} (in ${field}) is not allowed. Only @resend.dev test addresses and MY_EMAIL may receive email.`);
        }
      }
    }
  }
}

process.exit(0);

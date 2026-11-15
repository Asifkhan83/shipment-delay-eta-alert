# Resend live setup

How to switch the `resend` MCP server from practice mode to your real Resend account, without putting any secret in this repository. This repo is public, so secrets live only on your own machine, as user-level environment variables.

Live mode doesn't change who can receive email. The send-guard hook (`.claude/hooks/send-guard.mjs`) still blocks every recipient except `@resend.dev` test addresses and your own `MY_EMAIL`.

## How it works

`.mcp.json` is committed, but it holds no secrets. It only names the variables, using `${NAME:-practice default}`, and Claude Code fills them in from your environment when the server starts:

| Variable | Secret? | Practice default | Live value |
|---|---|---|---|
| `RESEND_API_KEY` | **yes** | `re_practice` | your Sending access key |
| `RESEND_BASE_URL` | no | `http://localhost:4000` | `https://api.resend.com` |
| `SENDER_EMAIL_ADDRESS` | no | `onboarding@resend.dev` | `onboarding@resend.dev`, or an address on a domain you verified in Resend |

Set all three, or none of them.

`MY_EMAIL` (your own address, used by the send guard) stays in `.claude/settings.local.json`. That file is git-ignored, so it never reaches GitHub. The template for it is `.claude/settings.local.example.json`.

## Where the key must never go

- `.mcp.json`, `.claude/settings.json`, or any other committed file
- `.claude/settings.local.json`, or any `.env` file inside this folder. They're git-ignored, but one wrong `git add -f` would publish them.
- chat messages to Claude

## Step 1: create a key

In the Resend dashboard, go to **API Keys → Create**. Pick **Sending access** rather than Full access, and if you can, limit it to one domain.

## Step 2: save it as a user environment variable

Each command asks for the key without showing it on screen, so it doesn't end up in your shell history.

### Windows (PowerShell)

```powershell
$k = Read-Host 'Resend API key' -AsSecureString
[Environment]::SetEnvironmentVariable('RESEND_API_KEY', [Net.NetworkCredential]::new('', $k).Password, 'User')
[Environment]::SetEnvironmentVariable('RESEND_BASE_URL', 'https://api.resend.com', 'User')
[Environment]::SetEnvironmentVariable('SENDER_EMAIL_ADDRESS', 'onboarding@resend.dev', 'User')
Remove-Variable k
```

Windows stores these values in your user profile, outside the repo.

### macOS and Linux (bash or zsh)

The commands create a private file in your home folder, readable only by you, and load it from your shell startup file:

```bash
mkdir -p ~/.config/resend && chmod 700 ~/.config/resend
read -rsp 'Resend API key: ' k && echo
umask 077 && cat > ~/.config/resend/env <<EOF
export RESEND_API_KEY='$k'
export RESEND_BASE_URL='https://api.resend.com'
export SENDER_EMAIL_ADDRESS='onboarding@resend.dev'
EOF
unset k
echo '[ -f ~/.config/resend/env ] && . ~/.config/resend/env' >> ~/.zshrc   # use ~/.bashrc for bash
```

On WSL, follow the macOS and Linux steps inside WSL.

## Step 3: restart Claude Code

Programs read environment variables only when they start. Close **every** Claude Code window, including the desktop app and any terminals, then open it again. To confirm the key is visible, without printing it:

```bash
node -e "console.log(process.env.RESEND_API_KEY ? 'key is set' : 'key NOT set')"
```

## Back to practice mode

Windows:

```powershell
'RESEND_API_KEY','RESEND_BASE_URL','SENDER_EMAIL_ADDRESS' | ForEach-Object { [Environment]::SetEnvironmentVariable($_, $null, 'User') }
```

macOS and Linux:

```bash
rm ~/.config/resend/env
```

Then restart Claude Code.

## If a key ever leaks

Delete it in the Resend dashboard right away and create a new one. Removing it from git history doesn't help once it's public: assume someone has already copied it.

## GitHub Actions (only if you add CI later)

If a workflow ever needs the key, store it under **Settings → Secrets and variables → Actions** in the GitHub repo and read it as `${{ secrets.RESEND_API_KEY }}`. Claude Code on your machine doesn't use GitHub Secrets, so Step 2 is still how you work locally.

## Requirements

- Node.js 22+ on your `PATH`. Both the Resend server (`npx`) and the send-guard hook (`node`) need it.

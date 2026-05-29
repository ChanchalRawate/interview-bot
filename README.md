# 100x Interview Voice Bot

A voice bot that answers interview questions as me — calm, analytical, IIT ISM Dhanbad background.

## Deploy on Replit (2 minutes, free)

### Step 1 — Create the Repl
1. Go to [replit.com](https://replit.com) and sign up / log in (free)
2. Click **+ Create Repl**
3. Choose template: **Node.js**
4. Name it anything (e.g. `interview-bot`) → click **Create Repl**

### Step 2 — Upload the files
In the Replit file panel (left sidebar):
- Delete the default `index.js` file
- Upload `server.js`, `index.html`, and `package.json` from this folder

### Step 3 — Add your API key (Secrets)
1. In the left sidebar, click the **🔒 Secrets** tab (lock icon)
2. Click **+ New Secret**
3. Key: `ANTHROPIC_API_KEY`
4. Value: your Anthropic API key (get one free at [console.anthropic.com](https://console.anthropic.com))
5. Click **Add Secret**

### Step 4 — Run it
1. Click the green **▶ Run** button
2. Replit will start the server — a browser preview appears on the right
3. Click the **↗ Open in new tab** button to get your public URL

**That's it.** Share that URL with 100x — it works for anyone, no setup needed.

---

## How it works
- `server.js` — Node.js HTTP server that proxies requests to the Anthropic API (keeps your key secret)
- `index.html` — The full voice bot UI (type or speak questions, hear answers read aloud)
- No npm installs needed — uses only Node.js built-ins (`http`, `https`, `fs`)

## Features
- 🎙️ Voice input (Chrome/Edge) — click the mic button and speak
- 🔊 Text-to-speech — answers are read aloud automatically
- 💬 Conversation memory — follow-up questions work naturally
- 📱 Works on mobile too

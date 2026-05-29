# 100x Interview Voice Bot

A voice bot that answers interview questions — calm, analytical, IIT ISM Dhanbad background.
Uses **Groq API** (completely free, no credit card needed).

## Get your FREE Groq API key (1 minute)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up free (Google or GitHub login works)
3. Click **API Keys** → **Create API Key** → copy it

## Deploy on Render (free)

### Step 1 — Push to GitHub
1. Go to [github.com](https://github.com) → sign up / log in
2. Click **New repository** → name it `interview-bot` → **Create repository**
3. Upload these 3 files: `server.js`, `index.html`, `package.json`
4. Click **Commit changes**

### Step 2 — Deploy on Render
1. Go to [render.com](https://render.com) → sign up free
2. Click **New → Web Service**
3. Connect GitHub → select `interview-bot`
4. Settings:
   - Runtime: `Node`
   - Build Command: (leave blank)
   - Start Command: `node server.js`
5. Add Environment Variable:
   - Key: `GROQ_API_KEY`
   - Value: your Groq key
6. Click **Create Web Service**

Your public URL will be ready in ~2 minutes. Share it with 100x!

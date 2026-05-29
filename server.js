const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const PORT = process.env.PORT || 3000;

const SYSTEM = `You are roleplaying as a real job candidate answering interview questions for an AI Agent Team at a company called 100x (fully remote role). Answer in first person, authentically, as this exact person:

Background:
- Integrated M.Tech in Mathematics and Computing from IIT ISM Dhanbad — a rigorous 5-year program blending deep math (linear algebra, probability, optimization, statistics) with core computing (algorithms, data structures, systems, ML)
- Genuinely interested in AI and ML — not just as a career but because it sits at the intersection of mathematics and real-world problem solving
- A curious learner by nature — prefers understanding things from first principles, not just using tools but knowing why they work
- Calm, thoughtful, and analytical in temperament — thinks before speaking, doesn't rush, prefers depth over speed
- Pushes limits by taking on difficult, uncomfortable projects — ones where the answer isn't known at the start; treats that discomfort as a growth signal
- Believes mathematical grounding + curiosity makes for strong AI agent work — reasoning under uncertainty, system design, and structured thinking are all natural strengths

Tone:
- First person, natural, direct — no corporate speak, no buzzwords
- Analytically warm — genuine thought, not robotic
- 3-5 flowing sentences unless more depth is clearly needed
- No bullet points in answers — speak in natural sentences
- Never open with "Great question!" or "Absolutely!" — just answer
- On weaknesses/growth: be honestly humble, not performatively so`;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { messages } = JSON.parse(body);
        const payload = JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          messages,
        });

        const options = {
          hostname: "api.anthropic.com",
          path: "/v1/messages",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Length": Buffer.byteLength(payload),
          },
        };

        const apiReq = https.request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", chunk => (data += chunk));
          apiRes.on("end", () => {
            res.writeHead(apiRes.statusCode, { "Content-Type": "application/json" });
            res.end(data);
          });
        });

        apiReq.on("error", (e) => {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: { message: e.message } }));
        });

        apiReq.write(payload);
        apiReq.end();
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: "Bad request: " + e.message } }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log("Voice bot running on port " + PORT);
  if (!API_KEY) console.warn("WARNING: ANTHROPIC_API_KEY env variable not set!");
});

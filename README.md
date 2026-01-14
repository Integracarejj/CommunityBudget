# CommunityBudget
Houses Integracare Community Budget site source code 
Objective (Pilot/MVP): Stand up a Vite + React + Fluent UI v9 SPA that calls existing Azure Function App endpoints, deploy on Azure Static Web Apps (FREE), and embed into SharePoint via the Embed web part. Pilot uses CORS only (no AAD tokens); Phase 2 adds EasyAuth + MSAL.

1) Current State
Backend — Azure Function App ✅

Base URL: https://pyscheduledprocs-cxfheugfhgeddhe2.canadacentral-01.azurewebsites.net
Endpoints:

GET /api/kb-get → show KB results in SPA
POST /api/ingest-spo-budgets → optional trigger for test payloads
POST /api/feedback → collect SPA feedback



Frontend — SPA (Vite + React + TS) ✅

New SPA lives under ./app
UI framework: Fluent UI v9 (no Sass)

SharePoint — Delivery Path ✅

Embed SWA public URL into a page using Embed web part

Auth — Pilot

No AAD; CORS only
Phase 2: Enable EasyAuth, use MSAL to acquire tokens


2) Repository & Folder Structure
GitHub: <https://github.com/Integracarejj/CommunityBudget>
CommunityBudget/
├─ app/                       # Vite/React SPA (active for pilot)
│  ├─ src/
│  │  ├─ components/          # KbList.tsx, FeedbackForm.tsx, IngestButton.tsx (pilot)
│  │  ├─ services/
│  │  │  └─ api.ts            # Centralized API client (CORS-only; fetch + VITE_API_BASE)
│  │  └─ vite-env.d.ts
│  ├─ staticwebapp.config.json# SPA fallback + framing/CSP headers for SharePoint (optional)
│  ├─ index.html
│  ├─ package.json
│  └─ .env.development        # VITE_API_BASE=...
└─ spfx/                      # Legacy scaffold (NOT used in pilot; causes TS/webpack/gulp issues)


During the pilot, work only inside app/. If VS Code shows errors from spfx/, either open VS Code on app/ only or rename spfx to spfx-legacy (close VS Code before rename to release file locks).


3) Environment & Configuration
Create/verify:
app/.env.development
Plain Textdotenv isn’t fully supported. Syntax highlighting is based on Plain Text.VITE_API_BASE=https://pyscheduledprocs-cxfheugfhgeddhe2.canadacentral-01.azurewebsites.netShow more lines
app/src/vite-env.d.ts
TypeScript/// <reference types="vite/client" />Show more lines
app/staticwebapp.config.json (add when deploying to SWA; helps SPA routing & SharePoint embedding)
JSON{  "navigationFallback": { "rewrite": "/index.html" },  "responseOverrides": { "404": { "rewrite": "/index.html" } },  "mimeTypes": { ".json": "application/json" },  "globalHeaders": {    "content-security-policy": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https:; frame-ancestors 'self' https://*.sharepoint.com https://*.sharepoint-df.com;",    "x-frame-options": "ALLOWALL"  }}Show more lines

Add the frame-ancestors values that match your tenant. Avoid X-Frame-Options: DENY or SharePoint will refuse to frame your SWA.


4) Portable Node 22 — Commands That Always Work
Your portable Node install uses a nested folder. Use these exact commands (no policy errors; tailored to your machine):
PowerShell# SETUP: define portable Node folder and add it to PATH for THIS window$nodeFolder="C:\Users\JeremyJoyner\code\NodeInstall\Node22\node-v22.21.1-win-x64\node-v22.21.1-win-x64"$env:Path="$nodeFolder;$env:Path"# INSTALL PACKAGES (example: Fluent UI v9)cd C:\Users\JeremyJoyner\code\CommunityBudget\app& "$env:ComSpec" /c "npm.cmd i @fluentui/react-components"# RUN DEV SERVER (localhost:5173)& "$env:ComSpec" /c "npm.cmd run dev"# BUILD FOR DEPLOY (creates app/dist)& "$env:ComSpec" /c "npm.cmd run build"Show more lines

"$env:ComSpec" /c "npm.cmd ..." forces execution via cmd.exe, bypassing PowerShell’s npm.ps1 signature policy.
All commands must be run from app/ so Vite/React dependencies install in the right place.


5) CORS & Azure Configuration
Function App → CORS
Add these origins:

https://localhost:5173 (dev)
https://<your-swa>.azurestaticapps.net (prod, after deploy)


Do not mix * with specific origins. JSON POSTs will preflight (OPTIONS); platform CORS will handle it with proper origin allow‑list.


6) Minimal Frontend Wiring (Pilot)

Centralized API client (app/src/services/api.ts) using import.meta.env.VITE_API_BASE and fetch

kbGet() → GET /api/kb-get
sendFeedback(payload) → POST /api/feedback
ingestBudgets(payload) → POST /api/ingest-spo-budgets


Components (Fluent UI v9):

KbList.tsx → renders KB grid from kbGet()
FeedbackForm.tsx → submits to /api/feedback with success/error toast
IngestButton.tsx (optional) → calls /api/ingest-spo-budgets with a test payload


App shell (App.tsx) composes the above components


Once we have a sample JSON from /api/kb-get, we’ll tune the columns (e.g., category, site, updated) for Integracare‑specific fields.


7) Deployment (Azure Static Web Apps — FREE)

From app/: npm run build (creates app/dist)
In SWA portal: Environments → Upload build artifacts → select app/dist
Add SWA public URL to Function App → CORS
In SharePoint: use Embed web part with the SWA URL


8) Troubleshooting Cheatsheet

TypeError: Failed to fetch (no status):
CORS issue—confirm Function App CORS includes https://localhost:5173 (and your SWA URL in prod).
HTTP 401/403 from Function App:
EasyAuth may be enabled inadvertently—pilot expects no auth (CORS only).
HTTP 404:
Route mismatch—confirm actual function paths and /api/ prefix.
OPTIONS preflight 204 but POST 500:
Function throws—inspect App Insights logs.
SharePoint frame blocked:
Missing/incorrect frame-ancestors in staticwebapp.config.json or tenant “HTML Field Security” not allowing SWA domain.
VS Code TypeScript errors from spfx/:
Open VS Code on CommunityBudget/app only, or rename spfx (close VS Code first to release locks).


9) Roadmap

Pilot (Now): SPA + CORS + SharePoint Embed
Phase 2 (Security): Enable EasyAuth on Function App; integrate MSAL in SPA to acquire and send Bearer tokens; tighten CORS to SWA origin only
Phase 3 (AI): Add Azure Cognitive Search (semantic/vector) + AOAI RAG; surface “Guidance” in SPA
Phase 4 (Optional SPFx): Rebuild as SPFx 1.18+ with CI builds (Node 18/20 agents), no local gulp


10) Immediate Next Step


Install Fluent UI v9 (from app/):
PowerShell$nodeFolder="C:\Users\JeremyJoyner\code\NodeInstall\Node22\node-v22.21.1-win-x64\node-v22.21.1-win-x64"$env:Path="$nodeFolder;$env:Path"cd C:\Users\JeremyJoyner\code\CommunityBudget\app& "$env:ComSpec" /c "npm.cmd i @fluentui/react-components"Show more lines


Run dev and verify API calls:
PowerShell& "$env:ComSpec" /c "npm.cmd run dev"Show more lines

Open http://localhost:5173/
Confirm GET /api/kb-get succeeds (DevTools → Network)
Submit feedback and see success toast



Share sample /api/kb-get JSON to finalize grid columns.



11) Notes on Security Hygiene

Do not store tokens, passwords, or sensitive creds in repo files, OneDrive notes, or code comments.
Use Azure App Settings / Key Vault for secrets; keep config out of source control.
Add linters or pre‑commit checks to prevent accidental secret commits (optional).


12) Ownership & Contacts

Product/PM: Jeremy Joyner
Manager: Belinda Mcquaide
Tech Lead (TBD): assign during Phase 2
SWA/SharePoint Admin: provide tenant contact if framing needs allow‑list


Quick Copy

Local dev:
& "$env:ComSpec" /c "npm.cmd run dev" (from app/ after setting $nodeFolder in PATH)
Build:
& "$env:ComSpec" /c "npm.cmd run build"
Deploy:
Upload app/dist to SWA → add SWA URL to Function App CORS → Embed in SharePoint


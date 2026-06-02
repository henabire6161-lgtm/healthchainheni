# HealthChain Ethiopia

**One Patient. One Record. One Nation.**

Ethiopia's national blockchain health data platform — Fayda integrated, government-owned, Digital Ethiopia 2030 aligned.

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Framework: **Vite**  
4. Build command: `npm run build`  
5. Output directory: `dist`  
6. Click Deploy ✓

## Local Development
```bash
npm install
npm run dev
```

## Portals
| Role | Path |
|------|------|
| Landing | `/` |
| Login | Click "Sign In" |
| Patient Dashboard | Login → Patient |
| Doctor Dashboard | Login → Doctor |
| Hospital Dashboard | Login → Hospital |
| Government MOH | Login → Government |

## Tech Stack
- React 18 + Vite
- Recharts (analytics charts)
- Lucide React (icons)
- DM Sans + Sora (Google Fonts)
- CSS Variables (no Tailwind needed)

## Brand Colors
- Primary Green: `#0a6640`
- Dark Green: `#052e16`
- Accent Gold: `#c9a84c`

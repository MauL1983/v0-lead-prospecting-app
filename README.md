# leadRX10

AI-powered B2B prospecting app generated with v0, now wired for real lead-search integrations.

## What is included

- Existing v0 UI for lead search, pipeline, outreach, meetings, analytics, and login.
- `/api/leads/search` route with a provider abstraction.
- Demo lead graph with realistic North America and Latin America prospects.
- Apollo-ready live search path.
- Latin America-first default ICP covering Mexico, Brazil, Colombia, Chile, Argentina, and Peru.
- CSV export for current search results.
- Integrations page showing required environment variables.

## Environment setup

Copy `.env.example` to `.env.local` and fill in the providers you want to activate.

```bash
AUTH_SECRET=...
AUTH_URL=https://your-domain.com
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
LEAD_DATA_PROVIDER=apollo
APOLLO_API_KEY=...
HUNTER_API_KEY=...
NEVERBOUNCE_API_KEY=...
WAPPALYZER_API_KEY=...
HUBSPOT_PRIVATE_APP_TOKEN=...
```

Without keys, the app uses demo mode.

For Google OAuth, add these redirect URIs in Google Cloud:

- `http://localhost:3000/api/auth/callback/google`
- `https://your-production-domain.com/api/auth/callback/google`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

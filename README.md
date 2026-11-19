# ContentFlow AI

ContentFlow AI is a transcript-to-content SaaS for creators and small businesses.
Users paste a transcript or long-form text and generate:

- Instagram captions
- YouTube titles and descriptions
- LinkedIn posts
- X/Twitter posts
- SEO-friendly blog articles
- Short-form video scripts
- Hashtags and keywords

## Architecture

- Frontend: React (Vite), responsive CSS, no external UI framework dependency
- Authentication: Supabase Auth
- Database: Supabase Postgres with row-level security
- AI generation: Server-side provider adapter with configurable environment variables
- Hosting target: Cloudflare Pages (frontend) + Supabase (backend data/auth)

## Tech stack decisions

This project intentionally uses Supabase Edge Functions instead of a continuously running Python server for the zero-budget pilot, so the free tier can host a static frontend and managed database/auth without requiring an always-on host.

AI provider keys are never stored in the browser. They live in server-side environment variables. Free AI API access is used where available; providers enforce their own quotas.

## Getting started

```bash
cd ContentFlow-AI
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key. Do not commit `.env.local`.

## Security

- Customer records are isolated per user via Supabase row-level security
- AI provider credentials stay server-side only
- No payment credentials or customer financial data stored locally
- No fake payments or fake statistics

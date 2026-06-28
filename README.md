# Houshang Flowers

A bilingual (EN/FA) flower shop storefront built with Next.js 16 and React 19.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript without emitting files
- `npm run check` - Run lint, typecheck, and production build

## Docker Production

1. Create the deployment env file:
   ```bash
   cp .env.production.example .env
   ```
2. Edit `.env` for the client's API domain, storage domain, contact numbers, and public port.
3. Build and start:
   ```bash
   docker compose up -d --build
   ```
4. Open `http://localhost/en` or the configured `NGINX_PORT`.

Important deployment notes:

- `API_BASE_URL`, `STORAGE_BASE_URL`, `NEXT_PUBLIC_API_BASE_URL`, and `NEXT_PUBLIC_STORAGE_BASE_URL` are used during the Docker image build. Rebuild the image after changing them.
- Runtime-only values such as `CONTACT_MOBILE_PHONE`, `CONTACT_OFFICE_PHONE`, `CONTACT_HOURS_OPEN`, and `CONTACT_HOURS_CLOSE` are read from the container environment.
- The default compose file assumes the Laravel API is reachable from inside Docker. For local development against `vendra.test`, the compose file maps `vendra.test` to the host gateway.
- The Docker health checks use `/api/health`, so app container health only verifies the storefront process and nginx proxy, not backend API data availability.
- Nginx global settings live in `nginx/nginx.conf`; the storefront proxy server block lives in `nginx/default.conf`.

## Project Notes

- App routes are locale-first: `/{locale}/...`
- Translation messages are stored in `messages/en.json` and `messages/fa.json`
- Application source lives under `src/`, with feature code in `src/modules/` and shared infrastructure in `src/shared/`
- Image hosts are configured in `next.config.ts` from the API and storage environment variables

## Tech Stack

- Next.js 16.2
- React 19.2
- TypeScript
- Tailwind CSS 4
- Radix UI + shadcn/ui components

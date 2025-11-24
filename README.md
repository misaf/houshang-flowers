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
- `npm run dev:https` - Start local HTTPS server on port `3443`
- `npm run generate-cert` - Generate local self-signed certificates
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
4. Open `http://localhost:8080/en` or the configured `NGINX_PORT`.

Important deployment notes:

- `API_BASE_URL`, `STORAGE_BASE_URL`, `NEXT_PUBLIC_API_BASE_URL`, and `NEXT_PUBLIC_STORAGE_BASE_URL` are used during the Docker image build. Rebuild the image after changing them.
- Runtime-only values such as `CONTACT_MOBILE_PHONE`, `CONTACT_OFFICE_PHONE`, `CONTACT_HOURS_OPEN`, and `CONTACT_HOURS_CLOSE` are read from the container environment.
- The default compose file assumes the Laravel API is reachable from inside Docker. For local development against `vendra.test`, the compose file maps `vendra.test` to the host gateway.
- The Docker health checks use `/api/health`, so app container health only verifies the storefront process and nginx proxy, not backend API data availability.

### Local Backend With Untrusted SSL

If the local Laravel backend uses an untrusted/self-signed SSL certificate, the Next.js app container will reject backend requests and product/category data will appear empty. For local development only, start compose with the insecure SSL override:

```bash
docker compose -f docker-compose.yml -f docker-compose.insecure-ssl.yml up -d --build
```

Do not use this override in production. Production should use a trusted HTTPS certificate for the backend API, or the backend CA certificate should be installed in the app container.

## HTTPS Development

To test features that require HTTPS:

1. Generate certificates (first time only):
   ```bash
   npm run generate-cert
   ```
2. Start HTTPS server:
   ```bash
   npm run dev:https
   ```
3. Open `https://localhost:3443` and accept the certificate warning.

## Project Notes

- App routes are locale-first: `/{locale}/...`
- Translation messages are stored in `messages/en.json` and `messages/fa.json`
- Shared API helpers live in `lib/`
- Image hosts are configured in `next.config.ts` from the API and storage environment variables

## Tech Stack

- Next.js 16.2
- React 19.2
- TypeScript
- Tailwind CSS 4
- Radix UI + shadcn/ui components

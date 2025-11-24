# Project Configuration

## API Configuration

Application endpoints are centralized in `lib/config.ts`.

Default configuration:

- `NEXT_PUBLIC_API_BASE_URL`
  - `https://vendra.test/v1`
- `API_BASE_URL`
  - `https://vendra.test/v1`
- `NEXT_PUBLIC_STORAGE_BASE_URL`
  - `https://vendra.test`
- `STORAGE_BASE_URL`
  - `https://vendra.test`

Guidelines:

- Never hardcode API or storage URLs inside components.
- Always use the existing configuration helpers.
- Reuse the project's API clients, queries, mutations, and utilities.
- Docker deployments should copy `.env.production.example` to `.env`, edit the values, and rebuild after changing `NEXT_PUBLIC_*` values.

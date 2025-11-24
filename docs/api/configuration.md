# API Configuration

API endpoints are configured centrally.

Use configuration helpers instead of hardcoded values.

Default environment variables:

```env
API_BASE_URL=https://vendra.test/v1
NEXT_PUBLIC_API_BASE_URL=https://vendra.test/v1
NEXT_PUBLIC_STORAGE_BASE_URL=https://vendra.test
STORAGE_BASE_URL=https://vendra.test
```

Never hardcode API or storage URLs inside components, hooks, or utilities.

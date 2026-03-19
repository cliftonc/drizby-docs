---
title: Configuration
description: Configure Drizby settings and AI providers
---

## AI Provider Setup

Drizby supports three AI providers. Configure them from the Settings page in the UI.

| Provider | Models | API Key |
|----------|--------|---------|
| Anthropic Claude | Claude 4, Claude 3.5 | `ANTHROPIC_API_KEY` |
| OpenAI | GPT-4o, GPT-4 | `OPENAI_API_KEY` |
| Google Gemini | Gemini Pro | `GOOGLE_API_KEY` |

## Dev API Access

In development mode (`NODE_ENV !== 'production'`), all API endpoints accept a Bearer token:

```bash
curl -H 'Authorization: Bearer dc-bi-dev-key' http://localhost:3461/cubejs-api/v1/meta
```

The key defaults to `dc-bi-dev-key` and can be overridden via the `DEV_API_KEY` environment variable. This authenticates as the admin user.

## Database Migrations

Drizby uses Drizzle ORM for its internal SQLite database. Migrations are applied automatically on startup.

:::caution
Never use `drizzle-kit push` — it applies changes directly without creating migration files. Always use `drizzle-kit generate` to create migration files, then let the app's `migrate()` call apply them on startup.
:::

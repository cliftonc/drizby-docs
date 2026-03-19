---
title: Environment Variables
description: Configuration via environment variables
---

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3461` | Server port |
| `NODE_ENV` | `development` | Set to `production` for production mode |
| `DEV_API_KEY` | `dc-bi-dev-key` | API key for dev mode auth bypass |
| `ENCRYPTION_KEY` | auto-generated | Key for encrypting stored credentials |

AI provider API keys are configured through the Settings UI and stored encrypted in the database.

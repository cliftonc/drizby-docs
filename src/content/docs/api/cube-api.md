---
title: Cube API
description: REST API for querying the semantic layer
---

All `/cubejs-api/*` routes proxy through drizzle-cube's semantic layer. The API is compatible with the Cube.js query format.

## Key Endpoints

- `GET /cubejs-api/v1/meta` — List all cubes, dimensions, and measures
- `POST /cubejs-api/v1/load` — Execute a cube query

## Authentication

In production, requests require a valid session cookie. In development, use the dev API key:

```bash
curl -H 'Authorization: Bearer dc-bi-dev-key' \
  http://localhost:3461/cubejs-api/v1/meta
```

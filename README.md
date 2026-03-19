# Drizby Docs

Documentation site for [Drizby](https://www.drizby.com), built with [Astro Starlight](https://starlight.astro.build/).

Served at [www.drizby.com/docs/](https://www.drizby.com/docs/getting-started/).

## Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Deployment

Deployed to Cloudflare Workers:

```bash
npm run deploy           # Production (www.drizby.com/docs/*)
npm run deploy:staging   # Staging
```

## Content

Pages live in `src/content/docs/` and are organized by section:

- `getting-started/` — Introduction, quick start, configuration
- `connections/` — Database connection guides (PostgreSQL, MySQL, SQLite, Snowflake, etc.)
- `semantic-layer/` — Schemas, cubes, AI generation
- `dashboards/` — Charts, analysis builder
- `notebooks/` — AI notebooks, provider setup
- `users/` — Authentication, roles, groups
- `api/` — Cube API, MCP server
- `self-hosting/` — Docker, environment variables

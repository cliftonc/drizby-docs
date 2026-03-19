---
title: Quick Start
description: Get Drizby running in 60 seconds
---

## Docker (Recommended)

Run Drizby with a single command:

```bash
docker run -p 3461:3461 -v drizby-data:/app/data ghcr.io/cliftonc/drizby:main
```

Then open [http://localhost:3461](http://localhost:3461).

On first startup, Drizby creates a demo SQLite database with sample data, cubes, and a dashboard so you can explore immediately.

## Drizby Cloud

Skip the setup entirely — deploy a fully managed instance in seconds at [cloud.drizby.com](https://cloud.drizby.com/register).

## From Source

```bash
git clone https://github.com/cliftonc/drizby.git
cd drizby
npm install
npm run setup    # Generate migrations, run them, seed demo data
npm run dev      # Start client (3460) + server (3461) with hot reload
```

## First Steps

1. **Connect** — Point Drizby at your database from the Connections page.
2. **Introspect** — Pull your schema via drizzle-kit and use AI to generate semantic cubes.
3. **Explore** — Ask questions in AI notebooks, build dashboards, and share with your team.

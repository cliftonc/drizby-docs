---
title: Database Connections
description: Connect Drizby to your databases
sidebar:
  order: 0
---

Drizby supports multiple simultaneous database connections. Each connection gets its own Drizzle ORM instance and SemanticLayerCompiler, so cubes are scoped per connection.

## Adding a Connection

Navigate to **Connections** in the sidebar and click **Add Connection**. Select your engine type, choose a provider, and enter your connection details.

You can test the connection before saving to verify everything works.

## Supported Engines

- [PostgreSQL](/docs/connections/postgresql/) — including Neon, Supabase, PGlite, and AWS Aurora
- [MySQL](/docs/connections/mysql/) — including PlanetScale and TiDB
- [SQLite](/docs/connections/sqlite/) — including Turso / LibSQL
- [Snowflake](/docs/connections/snowflake/) — cloud data warehouse
- [SingleStore](/docs/connections/singlestore/) — real-time distributed SQL
- [Databend](/docs/connections/databend/) — cloud-native data warehouse
- [DuckDB](/docs/connections/duckdb/) — in-process OLAP database

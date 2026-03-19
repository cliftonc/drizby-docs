---
sidebar:
  order: 0
title: Database Connections
description: Connect Drizby to your databases
---
sidebar:
  order: 0

Drizby supports multiple simultaneous database connections. Each connection gets its own Drizzle ORM instance and SemanticLayerCompiler, so cubes are scoped per connection.

## Adding a Connection

Navigate to **Connections** in the sidebar and click **Add Connection**. Select your engine type, choose a provider, and enter your connection details.

You can test the connection before saving to verify everything works.

## Supported Engines

- [PostgreSQL](/connections/postgresql/) — including Neon, Supabase, PGlite, and AWS Aurora
- [MySQL](/connections/mysql/) — including PlanetScale and TiDB
- [SQLite](/connections/sqlite/) — including Turso / LibSQL
- [Snowflake](/connections/snowflake/) — cloud data warehouse
- [SingleStore](/connections/singlestore/) — real-time distributed SQL
- [Databend](/connections/databend/) — cloud-native data warehouse
- [DuckDB](/connections/duckdb/) — in-process OLAP database

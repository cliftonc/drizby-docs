---
title: Schemas
description: Define database schemas with Drizzle ORM
---

Schemas define the structure of your database tables using Drizzle ORM's type-safe table builders. Drizby includes a Monaco-powered schema editor with full TypeScript autocomplete.

## Introspecting Schemas

Use drizzle-kit to pull your existing database schema:

```bash
npx drizzle-kit introspect
```

This generates Drizzle table definitions from your live database, which you can then import into Drizby's schema editor.

## Schema Editor

The built-in schema editor supports:

- TypeScript autocomplete for all Drizzle ORM column types
- Real-time type checking
- Import support for `drizzle-orm`, `drizzle-snowflake`, `drizzle-databend`, and more

---
title: PostgreSQL
description: Connect Drizby to PostgreSQL
---

Drizby supports multiple PostgreSQL providers. Select the one that matches your setup.

## Providers

### postgres.js (Recommended)

Best for long-running Node.js servers.

**Connection string:**

```
postgresql://user:password@host:5432/database
```

| Field | Example |
|-------|---------|
| User | `admin` |
| Password | `secret` |
| Host | `localhost` |
| Port | `5432` |
| Database | `mydb` |

### node-postgres (pg)

The classic `pg` driver.

**Connection string:**

```
postgresql://user:password@host:5432/database
```

### Neon Serverless

For [Neon](https://neon.tech) serverless PostgreSQL.

**Connection string:**

```
postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/dbname?sslmode=require
```

Get your connection string from the Neon dashboard.

### Supabase

For [Supabase](https://supabase.com) hosted PostgreSQL. Uses the postgres.js driver.

**Connection string:**

```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Get your connection string from Supabase → Settings → Database.

### PGlite (Embedded)

An embedded PostgreSQL that runs in-process — no server required.

**Connection string:**

```
file:data/my-pg-data
```

Data is stored on the local filesystem. Useful for development and testing.

### AWS Data API

For Amazon RDS clusters accessed via the Data API. Uses structured connection fields.

| Field | Required | Description |
|-------|----------|-------------|
| Resource ARN | Yes | ARN of the RDS cluster |
| Secret ARN | Yes | ARN of the Secrets Manager secret |
| Database | Yes | Database name |

### Amazon Aurora DSQL

For Amazon Aurora DSQL clusters. Uses token-based authentication with AWS credentials.

| Field | Required | Description |
|-------|----------|-------------|
| Host | Yes | Cluster endpoint |
| User | Yes | Username (typically `admin`) |

Requires AWS credentials configured in your environment.

## Schema Definition

PostgreSQL schemas use `pgTable` and column types from `drizzle-orm/pg-core`:

```typescript
import { pgTable, serial, text, integer, timestamp, real } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  amount: real('amount'),
  quantity: integer('quantity'),
  createdAt: timestamp('created_at').defaultNow()
})
```

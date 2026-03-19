---
title: Databend
description: Connect Drizby to Databend
---

Drizby connects to Databend using [drizzle-databend](https://www.npmjs.com/package/drizzle-databend) and the `databend-driver` package.

## Connection String

```
databend://user:password@host:8000/database?sslmode=disable
```

| Field | Example |
|-------|---------|
| User | `databend` |
| Password | `databend` |
| Host | `localhost` |
| Port | `8000` |
| Database | `default` |
| SSL Mode | `disable` or `require` |

## Schema Definition

Databend schemas use `databendTable` and column types from `drizzle-databend`:

```typescript
import { databendTable, int32, string, float64 } from 'drizzle-databend'

export const sales = databendTable('sales', {
  id: int32('id'),
  product: string('product'),
  revenue: float64('revenue'),
  quantity: int32('quantity')
})
```

## Notes

- Databend is a cloud-native data warehouse built for elasticity and performance.
- Uses async driver initialization.
- For Databend Cloud, use your cluster endpoint as the host with `sslmode=require`.

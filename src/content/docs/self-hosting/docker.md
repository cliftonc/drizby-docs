---
title: Docker
description: Self-host Drizby with Docker
---

## Quick Start

```bash
docker run -p 3461:3461 -v drizby-data:/app/data ghcr.io/cliftonc/drizby:main
```

This starts Drizby on port 3461 with persistent data stored in the `drizby-data` volume.

## Docker Compose

```yaml
services:
  drizby:
    image: ghcr.io/cliftonc/drizby:main
    ports:
      - "3461:3461"
    volumes:
      - drizby-data:/app/data
    restart: unless-stopped

volumes:
  drizby-data:
```

## Data Persistence

Drizby stores its internal SQLite database and configuration in `/app/data`. Mount this as a volume to persist data across container restarts.

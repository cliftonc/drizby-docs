---
title: MCP Server
description: Model Context Protocol server for AI agents
---

![MCP with Claude](/docs/images/claude_mcp.png)

Drizby includes a built-in MCP (Model Context Protocol) server with OAuth 2.1 authentication. AI assistants like Claude, VS Code Copilot, and Cursor can query your semantic layer directly.

## Setup

Point your MCP client at your Drizby instance:

```
https://your-drizby-instance.com/mcp
```

The MCP server exposes your cube metadata and query endpoints, allowing AI agents to discover available dimensions, measures, and execute queries with per-user security context.

See the [drizzle-cube MCP documentation](https://www.drizzle-cube.dev/ai/mcp-endpoints/) for endpoint details.

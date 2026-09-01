# create-ts-app

Scaffold TypeScript apps from the command line.

## Quick Start

```console
npx @nealwp/create-ts-app@latest
```

You'll be prompted for a project name and a template. A new directory is created with all files wired up and ready to go.

## Templates

### HTTP Service

A TypeScript-first REST API built with [Hono](https://hono.dev).

```console
npx @nealwp/create-ts-app@latest
# enter a project name
# select: http-service
```

**What's included:**

-   Hono server with CORS, compression, and security headers middleware
-   TypeScript with strict mode enabled
-   Linted and formatted with Biome
-   Unit tests via Node's built-in test runner (`app.request()` — no server needed)
-   Multi-stage Dockerfile for production builds

**Generated scripts:**

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server with tsx            |
| `npm run build`  | Compile TypeScript to `dist/`        |
| `npm start`      | Run compiled server                  |
| `npm test`       | Run tests                            |
| `npm run check`  | Type-check without emitting          |
| `npm run lint`   | Lint and check formatting (Biome)    |
| `npm run format` | Auto-fix lint and formatting (Biome) |

**Generated structure:**

```
src/
  app.ts               # Hono app definition (exported for testing)
  server.ts            # Node server bootstrap (port 3000)
  router.ts            # Example CRUD routes under /api/example
  service.ts           # Example service layer
  middleware/index.ts  # Security headers middleware
tests/
  router.test.ts       # Integration tests using app.request()
```

## Project Name Rules

Names may only contain letters, numbers, underscores, and dashes. Scoped package names (e.g. `@scope/name`) are not supported.

## License

ISC

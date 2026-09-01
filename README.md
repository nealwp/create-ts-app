# create-ts-app

Scaffold TypeScript apps from the command line.

## Quick Start

```console
npx @nealwp/create-ts-app@latest
```

You'll be prompted for a project name and a template. A new directory is created with all files wired up and ready to go.

## Templates

### HTTP Service

An Express-based REST API with TypeScript.

```console
npx @nealwp/create-ts-app@latest
# enter a project name
# select: http-service
```

**What's included:**

- Express server with JSON, CORS, Helmet, and compression middleware
- TypeScript with strict mode enabled
- ESLint and Prettier configured
- Unit tests via Node's built-in test runner and Supertest
- Multi-stage Dockerfile for production builds

**Generated scripts:**

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server |
| `npm test` | Run tests |
| `npm run check` | Type-check without emitting |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

**Generated structure:**

```
src/
  app.ts              # Express entry point (port 3000)
  router.ts           # Example CRUD routes under /api/example
  service.ts          # Example service layer
  middleware/index.ts  # Helmet, CORS, compression, JSON parsing
tests/
  router.test.ts      # Supertest integration tests
```

## Project Name Rules

Names may only contain letters, numbers, underscores, and dashes. Scoped package names (e.g. `@scope/name`) are not supported.

## License

ISC

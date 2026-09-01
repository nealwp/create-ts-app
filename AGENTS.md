# AGENTS.md

## What this repo is

A CLI scaffolding tool (`@nealwp/create-ts-app`) that interactively generates TypeScript projects from templates. The tool itself is plain ESM JavaScript with JSDoc types — TypeScript is only in the generated templates.

## Key commands

```bash
npm run typecheck   # tsc --noEmit (JS checked via checkJs)
npm run lint        # eslint (flat config, JS recommended only)
npm run prettier    # prettier --check . (write: npm run format)
npm test            # node --test --test-reporter=spec tests/*
```

CI order: typecheck → lint → prettier check → test. Mirror this order when verifying locally.

## Testing

-   Uses Node's built-in test runner (`node:test`), not Jest or Vitest.
-   Tests inject stubs for `fs` and `readline` into `generateProject()` — no filesystem or stdin touched.
-   Run a single test: `node --test --test-reporter=spec tests/index.spec.js`

## Architecture

-   `index.js` — CLI entrypoint (shebang, readline setup, calls generator)
-   `generator.js` — all scaffolding logic. Takes `rl` (readline) and `fs` stubs for testability.
-   `templates/http-service/` — the only template. Copied verbatim to output; only `package.json` name is rewritten.
-   Files skipped during copy: `node_modules`, `.template.json`, `package-lock.json`

## Style conventions

-   4-space indentation (Prettier `tabWidth: 4`)
-   JSON and YAML files excluded from Prettier (`.prettierignore`)
-   JSDoc type annotations on all JS functions in the tool — keep this pattern if adding code

## Gotchas

-   `eslint-config-prettier` is in devDependencies but **not wired** into the ESLint config
-   Template uses Hono, not Express: tests call `app.request()` (no Supertest), serving uses `@hono/node-server`, security headers are a hand-rolled middleware
-   The template has no `package-lock.json` in git — `npm ci` won't work in a fresh clone's template
-   Project name validation: `^([A-Za-z\-_\d])+$` — no dots, slashes, or scoped names
-   Template files are copied byte-for-byte (no templating engine) — edit templates in place under `templates/`
-   `.npmignore` excludes root `tests/`, config files; keeps `templates/*/tests/`

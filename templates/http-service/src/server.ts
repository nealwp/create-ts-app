import { serve } from "@hono/node-server";
import { app, port } from "./app.js";

serve({ fetch: app.fetch, port });

console.log(`server started. listening on port ${port}...`);

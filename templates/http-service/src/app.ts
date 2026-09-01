import { Hono } from "hono";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { securityHeaders } from "./middleware/index.js";
import router from "./router.js";

export const app = new Hono();

app.use("*", cors());
app.use("*", compress());
app.use("*", securityHeaders);
app.route("/", router);

export const port = 3000;

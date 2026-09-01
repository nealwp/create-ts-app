import { Hono } from "hono";
import service from "./service.js";

const router = new Hono().basePath("/api/example");

router.get("/health", (c) => {
    return c.text("ok");
});

router.get("/", (c) => {
    try {
        const examples = service.getExamples();
        return c.json(examples);
    } catch (error) {
        console.error(error);
        return c.text("internal server error", 500);
    }
});

router.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const saved = service.saveExample(body);
        return c.json(saved);
    } catch (error) {
        console.error(error);
        return c.text("internal server error", 500);
    }
});

router.delete("/:id", (c) => {
    try {
        const id = c.req.param("id");
        const deleted = service.deleteExample(+id);
        return c.json(deleted);
    } catch (error) {
        console.error(error);
        return c.text("internal server error", 500);
    }
});

export default router;

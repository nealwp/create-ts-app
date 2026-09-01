import { describe, it } from "node:test";
import assert from "node:assert";
import { app } from "../src/app";

describe("GET /api/example/health", () => {
    it("should return 200 status", async () => {
        const res = await app.request("/api/example/health");
        assert.strictEqual(res.status, 200);
    });
});

describe("GET /api/example", () => {
    it("should return 200 status", async () => {
        const res = await app.request("/api/example");
        assert.strictEqual(res.status, 200);
    });
});

describe("POST /api/example", () => {
    it("should return 200 status", async () => {
        const res = await app.request("/api/example", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "test" }),
        });
        assert.strictEqual(res.status, 200);
    });
});

describe("DELETE /api/example/:id", () => {
    it("should return 200 status", async () => {
        const res = await app.request("/api/example/1234", {
            method: "DELETE",
        });
        assert.strictEqual(res.status, 200);
    });
});

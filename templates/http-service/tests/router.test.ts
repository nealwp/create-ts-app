import supertest from "supertest";
import { describe, it } from "node:test";
import express from "express";
import router from "../src/router";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/example", router);
const request = supertest(server);

describe("GET /api/example/health", () => {
    it("should return 200 status", async () => {
        await request.get(`/api/example/health`).expect(200);
    });
});

describe("GET /api/example", () => {
    it("should return 200 status", async () => {
        await request.get(`/api/example`).expect(200);
    });
});

describe("POST /api/example", () => {
    it("should return 200 status", async () => {
        await request.post(`/api/example`).expect(200);
    });
});

describe("DELETE /api/example/:id", () => {
    it("should return 200 status", async () => {
        await request.delete(`/api/example/1234`).expect(200);
    });
});

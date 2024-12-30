import supertest from "supertest";
import { describe, it } from 'node:test';
import express from "express";
import router from "../src/router";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
const request = supertest(server);

describe("GET /health", () => {
    it("should return 200 status", async () => {
        await request.get(`/health`).expect(200);
    });
});

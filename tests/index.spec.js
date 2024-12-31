import { it, describe } from "node:test";
import * as assert from "node:assert";
import { generateProject } from "../generator.js";
import * as path from "node:path";
import * as helpers from "./helpers.js";

describe("project generator", async () => {
    const invalidName = "foo%bar";
    const validName = "foo_bar";

    it("should error on invalid names", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([invalidName]);
        await assert.rejects(async () => await generateProject(rlStub, fsStub));
    });

    it("should accept a valid name", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        await assert.doesNotReject(
            async () => await generateProject(rlStub, fsStub),
        );
    });

    it("should error if target path exists", async () => {
        const fsStub = helpers.getFsStub(true, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName]);
        await assert.rejects(async () => await generateProject(rlStub, fsStub));
    });

    it("should not error if target path is available", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        await assert.doesNotReject(
            async () => await generateProject(rlStub, fsStub),
        );
    });

    it("should error on invalid template", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "invalid-template"]);
        await assert.rejects(async () => await generateProject(rlStub, fsStub));
    });

    it("should not error when valid template selected", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        await assert.doesNotReject(
            async () => await generateProject(rlStub, fsStub),
        );
    });

    it("should create the project directory", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        const expected = [path.join(process.cwd(), validName)];
        await generateProject(rlStub, fsStub);
        assert.deepStrictEqual(fsStub.createdDirs, expected);
    });

    it("should copy template files to project directory", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        const expected = helpers.getExpectedFiles(validName);
        await generateProject(rlStub, fsStub);
        assert.deepStrictEqual(fsStub.createdFiles, expected);
    });

    it("should not copy template files that are in the skip list", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        await generateProject(rlStub, fsStub);
        assert.ok(!fsStub.createdFiles.includes("node_modules"));
        assert.ok(!fsStub.createdFiles.includes("package-lock.json"));
    });

    it("return the project name when completes successful", async () => {
        const fsStub = helpers.getFsStub(false, ["valid-template"]);
        const rlStub = helpers.getReadlineStub([validName, "valid-template"]);
        const result = await generateProject(rlStub, fsStub);
        assert.strictEqual(result, validName);
    });
});

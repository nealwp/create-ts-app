#!/usr/bin/env node
import * as readline from "node:readline/promises";
import * as fs from "node:fs";
import * as generator from "./generator.js";

async function main() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const projectName = await generator.generateProject(rl, fs);
        console.log(`created ${projectName}`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

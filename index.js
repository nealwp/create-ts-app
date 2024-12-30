#!/usr/bin/env node
import readline from "node:readline/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { validProjectName } from "./generator.js";

const filesToSkip = ["node_modules", ".template.json", "package-lock.json"];

/**
 * @param {{ cwd: string, templatePath: string, projectName: string }} args
 */
function createProjectFromTemplate(args) {
    const templateDir = fs.readdirSync(args.templatePath, { recursive: true });
    for (const item of templateDir) {
        const src = path.join(args.templatePath, item);

        if (filesToSkip.includes(item)) {
            continue;
        };

        const stats = fs.statSync(src);
        const dest = path.join(args.cwd, args.projectName, item);

        if (stats.isDirectory()) {
            fs.mkdirSync(dest);
            continue;
        } else if (stats.isFile()) {
            fs.copyFileSync(src, dest);
        }
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const projectName = await rl.question("enter a project name: ");

    if (!validProjectName(projectName)) {
        console.error(
            "ERROR: invalid project name. can only contain letters, numbers, underscores and dashes.",
        );
        process.exit(1);
    }

    const cwd = process.cwd();
    const targetPath = path.join(cwd, projectName);

    if (fs.existsSync(targetPath)) {
        console.error(`ERROR: ${targetPath} already exists.`);
        process.exit(1);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templates = fs.readdirSync(path.join(__dirname, "templates"));
    const selectedTemplate = await rl.question(
        `enter a template: [${templates.join(",")}] `,
    );

    if (!templates.includes(selectedTemplate)) {
        console.error(
            `ERROR: invalid template. must be one of ${templates.join(",")}`,
        );
        process.exit(1);
    }

    const templatePath = path.join(__dirname, "templates", selectedTemplate);

    fs.mkdirSync(targetPath);

    try {
        createProjectFromTemplate({ cwd, templatePath, projectName });
        //    renameDotfiles(projectName);
        console.log(`created ${projectName}`)
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

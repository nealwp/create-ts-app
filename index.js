#!/usr/bin/env node
import readline from "node:readline/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

//const SKIP_FILES = ['node_modules', '.template.json', 'package-lock.json'];
//
//function createDirectoryContents(templatePath: string, projectName: string) {
//    const filesToCreate = fs.readdirSync(templatePath);
//    filesToCreate.forEach((file) => {
//        const origFilePath = path.join(templatePath, file);
//
//        const stats = fs.statSync(origFilePath);
//
//        if (SKIP_FILES.indexOf(file) > -1) return;
//
//        if (stats.isFile()) {
//            const contents = fs.readFileSync(origFilePath, 'utf8');
//            const writePath = path.join(CURR_DIR, projectName, file);
//            fs.writeFileSync(writePath, contents, 'utf8');
//        } else if (stats.isDirectory()) {
//            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
//            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
//        }
//    });
//}
//
//function renameDotfiles(projectName: string) {
//
//    const dotfiles = ['gitignore', 'prettierrc.json', 'eslintrc.json', 'prettierignore'];
//
//    for (const file of dotfiles) {
//        const oldPath = path.join(CURR_DIR, projectName, file);
//        if (fs.existsSync(oldPath)) {
//            const newPath = path.join(CURR_DIR, projectName, `.${file}`);
//            fs.renameSync(oldPath, newPath)
//        }
//    }
//}

/**
 * @param {string} name
 */
function validProjectName(name) {
  const regex = new RegExp("^([A-Za-z\\-_\\d])+$");
  return regex.test(name);
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

  process.exit(0);
}

main();
//prompt(QUESTIONS).then((answers) => {
//    const projectChoice = answers['project-choice'];
//    const projectName = answers['project-name'];
//
//    const templatePath = path.join(__dirname, 'templates', projectChoice);
//    const tartgetPath = path.join(CURR_DIR, projectName);
//
//
//    createDirectoryContents(templatePath, projectName);
//    renameDotfiles(projectName);
//});

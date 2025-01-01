import * as path from "node:path";
import { fileURLToPath } from "url";

/**
 * @typedef {Object} ReadDirOpts
 * @property {boolean} recursive
 * @property {'utf8'} encoding
 */

/**
 * @typedef {Object} StatObj
 * @property {function(): boolean} isDirectory
 * @property {function(): boolean} isFile
 */

/**
 * @typedef {Object} Fs
 * @property {function(string): boolean} existsSync
 * @property {function(string, ReadDirOpts): string[]} readdirSync
 * @property {function(string): void} mkdirSync
 * @property {function(string): StatObj} statSync
 * @property {function(string, string): void} copyFileSync
 * @property {function(string, 'utf8'): string} readFileSync
 * @property {function(string, string, 'utf8'): void} writeFileSync
 */

/**
 * @typedef {Object} Rl
 * @property {function(string): Promise<string>} question
 */

/**
 * @param {Rl} rl
 * @param {Fs} fs
 */
export async function generateProject(rl, fs) {
    const projectName = await getProjectName(rl);
    validateProjectName(projectName);
    const targetPath = getTargetPath(fs, projectName);
    const templatePath = await getTemplateSelection(fs, rl);
    createProjectDir(fs, targetPath);
    copyTemplateFiles(fs, templatePath, projectName);
    setPackageName(fs, targetPath, projectName);
    return projectName;
}

/**
 * @param {Rl} rl
 */
async function getProjectName(rl) {
    return rl.question("enter a project name: ");
}

/**
 * @param {string} name
 */
function validateProjectName(name) {
    const regex = new RegExp("^([A-Za-z\\-_\\d])+$");
    if (!regex.test(name)) {
        throw new Error(
            "invalid project name. can only contain letters, numbers, underscores and dashes.",
        );
    }
    return;
}

/**
 * @param {string} name
 * @param {Fs} fs
 */
function getTargetPath(fs, name) {
    const cwd = process.cwd();
    const targetPath = path.join(cwd, name);

    if (fs.existsSync(targetPath)) {
        throw new Error(`${targetPath} already exists.`);
    }
    return targetPath;
}

/**
 * @param {Fs} fs
 */
function getTemplateList(fs) {
    return fs.readdirSync(path.join(dirname(), "templates"), {
        recursive: false,
        encoding: "utf8",
    });
}

function dirname() {
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
}

/**
 * @param {Fs} fs
 * @param {Rl} rl
 */
async function getTemplateSelection(fs, rl) {
    const templates = getTemplateList(fs);

    const selectedTemplate = await rl.question(
        `enter a template: [${templates.join(",")}] `,
    );

    if (!templates.includes(selectedTemplate)) {
        throw new Error(
            `ERROR: invalid template. must be one of ${templates.join(",")}`,
        );
    }
    return path.join(dirname(), "templates", selectedTemplate);
}

/**
 * @param {Fs} fs
 * @param {string} path
 */
function createProjectDir(fs, path) {
    fs.mkdirSync(path);
}

const filesToSkip = ["node_modules", ".template.json", "package-lock.json"];

/**
 * @param {Fs} fs
 * @param {string} templatePath
 * @param {string} projectName
 */
function copyTemplateFiles(fs, templatePath, projectName) {
    const cwd = process.cwd();
    const templateItems = fs.readdirSync(templatePath, {
        recursive: true,
        encoding: "utf8",
    });
    for (const item of templateItems) {
        const src = path.join(templatePath, item);

        if (filesToSkip.includes(item)) {
            continue;
        }

        const stats = fs.statSync(src);
        const dest = path.join(cwd, projectName, item);

        if (stats.isDirectory()) {
            fs.mkdirSync(dest);
            continue;
        } else if (stats.isFile()) {
            fs.copyFileSync(src, dest);
        }
    }
}

/**
 * @param {Fs} fs
 * @param {string} templatePath
 * @param {string} name
 */
function setPackageName(fs, templatePath, name) {
    const packageJsonPath = path.join(templatePath, "package.json");
    const data = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(data);
    packageJson.name = name;
    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        "utf8",
    );
}

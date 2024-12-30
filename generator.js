import * as path from "node:path";

/**
 * @typedef { import('node:readline/promises').Interface} ReadlineInterface
 */

/**
 * @typedef {Object} Fs
 * @property {function(string): boolean} existsSync
 */

/**
 * @param {ReadlineInterface} rl
 * @param {Fs} fs
 */
export async function generateProject(rl, fs) {
    const projectName = await getProjectName(rl);
    console.log(projectName);
    validateProjectName(projectName);
    const targetPath = getTargetPath(fs, projectName);
}

/**
 * @param {ReadlineInterface} rl
 */
async function getProjectName(rl) {
    const name = await rl.question("enter a project name: ");
    return name;
}

/**
 * @param {string} name
 */
export function validProjectName(name) {
    const regex = new RegExp("^([A-Za-z\\-_\\d])+$");
    return regex.test(name);
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
    };
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

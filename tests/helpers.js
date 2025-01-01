import * as path from "node:path";

const fakeTemplateFiles = [
    "file1",
    "file2",
    "file3",
    "node_modules",
    "package-lock.json",
];

/**
 * @param {string[]} retVals
 */
export function getReadlineStub(retVals) {
    return {
        callCount: 0,
        question: async function() {
            const result = retVals[this.callCount];
            this.callCount += 1;
            return result;
        },
    };
}

/**
 * @typedef {Object} StatObj
 * @property {() => boolean} isFile
 * @property {() => boolean} isDirectory
 */

/**
 * @typedef {Object} ReaddirOpts
 * @property {boolean} recursive
 * @property {'utf8'} encoding
 */

/**
 * @typedef {(path: string, opts: ReaddirOpts) => string[]} ReaddirFunc
 */

/**
 * @typedef {Object} FsStub
 * @property {string[]} createdFiles
 * @property {string[]} createdDirs
 * @property {string} pkgJsonContent
 * @property {function(string): boolean} existsSync
 * @property {ReaddirFunc} readdirSync
 * @property {function(string): void} mkdirSync
 * @property {function(string): StatObj } statSync
 * @property {function(string, string): void} copyFileSync
 * @property {function(string, 'utf8'): string} readFileSync
 * @property {function(string, string, 'utf8'): void} writeFileSync
 */

/**
 * @param {boolean} retVal
 * @param {string[]} retVal2
 * @returns {FsStub}
 */
export function getFsStub(retVal, retVal2 = []) {
    return {
        createdFiles: [],
        createdDirs: [],
        pkgJsonContent: "{}",
        existsSync: () => retVal,
        readdirSync: function(path, opts) {
            if (opts.recursive) {
                return fakeTemplateFiles;
            } else {
                return retVal2;
            }
        },
        mkdirSync: function(dir) {
            this.createdDirs.push(dir);
        },
        statSync: function(path) {
            return {
                isFile: () => !path.endsWith("/"),
                isDirectory: () => path.endsWith("/"),
            };
        },
        copyFileSync: function(src, dest) {
            this.createdFiles.push(dest);
        },
        readFileSync: function() {
            return this.pkgJsonContent;
        },
        writeFileSync: function(path, content) {
            this.pkgJsonContent = content;
        },
    };
}

/**
 * @param {string} projectName
 */
export function getExpectedFiles(projectName) {
    const cwd = process.cwd();
    return fakeTemplateFiles
        .filter((f) => !["node_modules", "package-lock.json"].includes(f))
        .map((f) => path.join(cwd, projectName, f));
}

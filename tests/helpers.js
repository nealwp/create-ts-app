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
        question: async function () {
            const result = retVals[this.callCount];
            this.callCount += 1;
            return result;
        },
    };
}

/**
 * @param {boolean} retVal
 * @param {string[]} retVal2
 */
export function getFsStub(retVal, retVal2 = []) {
    return {
        createdFiles: [],
        createdDirs: [],
        existsSync: () => retVal,
        /**
         * @param {string} path
         * @param {Object?} opts
         */
        readdirSync: function (path, opts) {
            if (opts && opts.recursive) {
                return fakeTemplateFiles;
            } else {
                return retVal2;
            }
        },
        /**
         * @param {string} dir
         */
        mkdirSync: function (dir) {
            this.createdDirs.push(dir);
        },
        statSync: () => {
            return {
                isFile: () => true,
                isDirectory: () => false,
            };
        },
        /**
         * @param {string} src
         * @param {string} dest
         */
        copyFileSync: function (src, dest) {
            this.createdFiles.push(dest);
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

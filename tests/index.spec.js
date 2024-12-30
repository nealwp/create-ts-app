import { it, describe } from 'node:test';
import * as assert from 'node:assert';
import * as readline from 'node:readline/promises';
import { generateProject } from '../generator.js';
import { Readable } from 'node:stream';

/**
* @param {string} input
*/
function getReadlineInterface(input) {
    const fakeStdin = Readable.from(input + '\n');
    return readline.createInterface({
        input: fakeStdin,
        output: process.stdout,
    });
}

/**
* @param {boolean} retVal
*/
function getFsStub(retVal) {
    return {
        existsSync: () => retVal,
    }
}

describe('project generator', async () => {

    const invalidName = 'foo%bar';
    const validName = 'foo_bar';

    it('should error on invalid names', async () => {
        const fsStub = getFsStub(false)
        const rlStub = getReadlineInterface(invalidName)
        await assert.rejects(async () => await generateProject(rlStub, fsStub))
    })

    it('should accept a valid name', async () => {
        const fsStub = getFsStub(false)
        const rlStub = getReadlineInterface(validName)
        assert.doesNotThrow(async () => await generateProject(rlStub, fsStub))
    });

    it('should error if target path exists', async () => {
        const fsStub = getFsStub(true)
        const rlStub = getReadlineInterface(validName)
        await assert.rejects(async () => await generateProject(rlStub, fsStub))
    });

    it('should not error if target path is available', async () => {
        const fsStub = getFsStub(false)
        const rlStub = getReadlineInterface(validName)
        assert.doesNotThrow(async () => await generateProject(rlStub, fsStub))
    });
});


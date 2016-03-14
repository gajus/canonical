/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import tmp from 'tmp';

import {
    fixFiles
} from './../../src';

import fs from 'fs';

const writeTemporaryFile = (contents, options) => {
    const targetFile = tmp.tmpNameSync(options);

    fs.writeFileSync(targetFile, contents);

    return targetFile;
};

const readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

describe('utilities', () => {
    describe('fixFiles', () => {
        context('no file paths', () => {
            it('generates empty report', () => {
                const report = fixFiles([]);

                expect(report).to.deep.equal({
                    results: []
                });
            });
        });
        context('JavaScript syntax', () => {
            it('fixes syntax error', () => {
                const targetFile = writeTemporaryFile('let foo;;;', {
                    postfix: '.js'
                });

                fixFiles([
                    targetFile
                ], {
                    syntax: 'js'
                });

                expect(readFile(targetFile)).to.equal('let foo;\n');
            });
        });
    });
});

/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import tmp from 'tmp';

import {
    fixFiles
} from './../../src';

import fs from 'fs';

let readFile,
    writeTemporaryFile;

writeTemporaryFile = (contents, options) => {
    let targetFile;

    targetFile = tmp.tmpNameSync(options);

    fs.writeFileSync(targetFile, contents);

    return targetFile;
};

readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

describe('utilities', () => {
    describe('fixFiles', () => {
        context('no file paths', () => {
            it('generates empty report', () => {
                let report;

                report = fixFiles([]);

                expect(report).to.deep.equal({
                    results: []
                });
            });
        });
        context('JavaScript syntax', () => {
            it('fixes syntax error', () => {
                let report,
                    targetFile;

                targetFile = writeTemporaryFile('let foo;;;', {
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

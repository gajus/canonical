/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import {
    lintFiles
} from './../src';

describe('lintFiles', () => {
    context('no file paths', () => {
        it('generates empty report', () => {
            let report;

            report = lintFiles([]);

            expect(report).to.deep.equal({
                results: [],
                errorCount: 0,
                warningCount: 0
            });
        });
    });
});

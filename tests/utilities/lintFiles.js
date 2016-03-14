/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import {
    lintFiles
} from './../../src';

describe('utilities', () => {
    describe('lintFiles', () => {
        context('no file paths', () => {
            it('generates empty report', () => {
                const report = lintFiles([]);

                expect(report).to.deep.equal({
                    errorCount: 0,
                    results: [],
                    warningCount: 0
                });
            });
        });
    });
});

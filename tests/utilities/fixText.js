/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import {
    fixText
} from './../../src';

describe('utilities', () => {
    describe('fixText', () => {
        context('unrecognized syntax', () => {
            it('throws an error', () => {
                expect(() => {
                    fixText('', {
                        syntax: 'java'
                    });
                }).to.throw(Error, 'Unknown syntax "java".');
            });
        });
        context('JavaScript syntax', () => {
            context('invalid syntax', () => {
                it('throws an error', () => {
                    expect(() => {
                        fixText('let foo;<>;;', {
                            syntax: 'js'
                        });
                    }).to.throw(Error, 'Parsing error: Unexpected token (line: 1, column: 9).');
                });
            });
            it('fixes syntax error', () => {
                let report;

                report = fixText('let foo;;;', {
                    syntax: 'js'
                });

                expect(report).to.equal('let foo;\n');
            });
        });
    });
});

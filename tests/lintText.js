/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import {
    lintText
} from './../src';

describe('lintText', () => {
    context('unrecognized linter', () => {
        it('throws an error', () => {
            expect(() => {
                lintText('', {
                    linter: 'java'
                });
            }).to.throw(Error, 'Unknown linter "java".');
        });
    });
});

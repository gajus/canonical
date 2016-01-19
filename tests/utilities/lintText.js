/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import {
    lintText
} from './../../src';

describe('utilities', () => {
    describe('lintText', () => {
        context('unrecognized syntax', () => {
            it('throws an error', () => {
                expect(() => {
                    lintText('', {
                        syntax: 'java'
                    });
                }).to.throw(Error, 'Unknown syntax "java".');
            });
        });
    });
});

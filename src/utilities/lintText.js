import {
    lintText as lintJsText
} from './../syntaxes/js';
import {
    lintText as lintJsonText
} from './../syntaxes/json';
import {
    lintText as lintScssText
} from './../syntaxes/scss';
import crypto from 'crypto';
import LRU from 'lru-cache';
import type {
    LintResultType,
    LintOptionsType
} from './../types';

const cache = LRU(500);

export default (text: string, options: LintOptionsType): LintResultType => {
    let result;

    const hash = crypto.createHash('sha1').update(text + JSON.stringify(options)).digest('hex');

    result = cache.get(hash);

    if (result) {
        return result;
    }

    if (options.syntax === 'css') {
        result = lintScssText(text);
    } else if (options.syntax === 'js') {
        result = lintJsText(text);
    } else if (options.syntax === 'json') {
        result = lintJsonText(text);
    } else if (options.syntax === 'scss') {
        result = lintScssText(text);
    } else {
        throw new Error('Unknown syntax "' + options.syntax + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    cache.set(hash, result);

    return result;
};

import {
    fixText as fixJsText
} from './../syntaxes/js';
import {
    fixText as fixJsonText
} from './../syntaxes/json';
import {
    fixText as fixScssText
} from './../syntaxes/scss';
import type {
    FixOptionsType
} from './../types';

export default (text: string, options: FixOptionsType): string => {
    let result;

    if (options.syntax === 'css') {
        result = fixScssText(text);
    } else if (options.syntax === 'js') {
        result = fixJsText(text);
    } else if (options.syntax === 'json') {
        result = fixJsonText(text);
    } else if (options.syntax === 'scss') {
        result = fixScssText(text);
    } else {
        throw new Error('Unknown syntax "' + options.syntax + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    return result;
};

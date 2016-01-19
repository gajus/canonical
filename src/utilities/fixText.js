import {
    fixText as fixJSText
} from './../syntaxes/js';

import {
    fixText as fixSCSSText
} from './../syntaxes/scss';

/**
 * @property syntax Supported syntaxes: 'js', 'css', 'scss'.
 */
type OptionsType = {
    syntax: string
};

export default (text: string, options: OptionsType = {}): string => {
    let result;

    options.syntax = options.syntax || null;

    if (options.syntax === 'js') {
        result = fixJSText(text);
    } else if (options.syntax === 'css') {
        result = fixSCSSText(text);
    } else if (options.syntax === 'scss') {
        result = fixSCSSText(text);
    } else {
        throw new Error('Unknown syntax "' + options.syntax + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    return result;
};

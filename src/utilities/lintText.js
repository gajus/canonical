import {
    lintText as lintJSText
} from './../syntaxes/js';

import {
    lintText as lintSCSSText
} from './../syntaxes/scss';

/**
 * @typedef lintText~message
 * @property {string} ruleId
 * @property {number} severity
 * @property {string} message
 * @property {number} line
 * @property {number} column
 * @property {string} nodeType
 * @property {string} source
 */

/**
 * @typedef lintText~result
 * @property {string} filePath
 * @property {lintFiles~message[]} messages
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @property syntax Supported syntaxes: 'js', 'css', 'scss'.
 * @property filePath (optional) (default: '<text>')
 */
type OptionsType = {
    syntax: string,
    filePath: string
};

/**
 * @param {string} text
 * @param {lintText~options} options
 * @returns {lintText~result}
 */
export default (text: string, options: OptionsType): Object => {
    let result;

    if (options.syntax === 'js') {
        result = lintJSText(text);
    } else if (options.syntax === 'css') {
        result = lintSCSSText(text);
    } else if (options.syntax === 'scss') {
        result = lintSCSSText(text);
    } else {
        throw new Error('Unknown syntax "' + options.syntax + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    return result;
};

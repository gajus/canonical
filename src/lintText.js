import {
    lintText as lintJSText
} from './linters/js';

import {
    lintText as lintSCSSText
} from './linters/scss';

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
 * @typedef lintText~options
 * @property {string} linter (supported linters: 'js', 'scss').
 * @property {string} filePath (optional) (default: '<text>')
 */

/**
 * @param {string} text
 * @param {lintText~options} options
 * @returns {lintText~result}
 */
export default (text, options) => {
    let result;

    if (options.linter === 'js') {
        result = lintJSText(text);
    } else if (options.linter === 'scss') {
        result = lintSCSSText(text);
    } else {
        throw new Error('Unknown linter "' + options.linter + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    return result;
};

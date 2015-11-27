import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import tableFormatter from './formatters/canonical';
import checkstyleFormatter from './formatters/checkstyle';

import {
    lintText as lintJSText
} from './linters/js/';

import {
    lintText as lintSCSSText
} from './linters/scss/';

let getFormatter,
    lintFiles,
    lintText,
    linterMap;

linterMap = {
    '.js': 'js',
    '.css': 'scss',
    '.scss': 'scss'
};

/**
 * @param {string} name Default: table
 * @return {Function}
 */
getFormatter = (name) => {
    if (name === 'checkstyle') {
        return checkstyleFormatter;
    }

    return tableFormatter;
};

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
 */

/**
 * @param {string} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
lintText = (text, options) => {
    let result;

    if (options.linter === 'js') {
        result = lintJSText(text);
    } else if (options.linter === 'scss') {
        result = lintSCSSText(text);
    } else {
        throw new Error('Unknown linter "' + options.linter + '".');
    }

    return result;
};

/**
 * @typedef lintFiles~report
 * @property {lintText~result[]} results
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @param {string[]} filePaths
 * @return {lintFiles~report}
 */
lintFiles = (filePaths) => {
    let report;

    report = {};
    report.results = [];
    report.errorCount = 0;
    report.warningCount = 0;

    _.forEach(filePaths, (filePath) => {
        let extensionName,
            result,
            text;

        extensionName = path.extname(filePath);

        if (linterMap[extensionName]) {
            text = fs.readFileSync(filePath, {
                encoding: 'utf8'
            });

            result = lintText(text, {
                linter: linterMap[extensionName]
            });

            result.filePath = filePath;

            report.results.push(result);
            report.errorCount += result.errorCount;
            report.warningCount += result.warningCount;
        } else {
            /* eslint-disable no-console */
            console.warn('Ignoring file "' + filePath + '". No linter mapped to "' + extensionName + '" extension.');
            /* eslint-enable no-console */
        }
    });

    return report;
};

export {
    getFormatter,
    lintText,
    lintFiles
};

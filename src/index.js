import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import formatter from './formatters/canonical';

import {
    lintText as lintJSText
} from './linters/js/';

/* import {
    lintText as lintSCSSText
} from './linters/scss/'; */

let getFormatter,
    lintText,
    lintFiles,
    linterMap;

linterMap = {
    '.js': 'js'
    // '.css': 'scss',
    // '.scss': 'scss'
};

/**
 * @return {Function}
 */
getFormatter = () => {
    return formatter;
};

/**
 * @typedef lintText~message
 * @property {String} ruleId
 * @property {Number} severity
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 * @property {String} nodeType
 * @property {String} source
 */

/**
 * @typedef lintText~result
 * @property {String} filePath
 * @property {lintFiles~message[]} messages
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @typedef lintText~options
 * @property {String} language (supported languages: 'js', 'scss').
 */

/**
 * @param {String} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
lintText = (text, options) => {
    let result;

    if (options.linter === 'js') {
        result = lintJSText(text)
    // } else if (options.linter === 'scss') {
    //    result = lintSCSSText(text)
    } else {
        throw new Error(`Unknown linter "${options.linter}".`);
    }

    return result;
};

/**
 * @typedef lintFiles~report
 * @property {lintText~result[]} results
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @param {String[]} filePaths
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
            console.warn(`Ignoring file "${filePath}". No linter mapped to "${extensionName}" extension.`);
        }
    });

    return report;
};

export {
    getFormatter,
    lintText,
    lintFiles
};

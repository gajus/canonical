import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import lintText from './lintText';

let linterMap;

linterMap = {
    '.js': 'js',
    '.css': 'scss',
    '.scss': 'scss'
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
export default (filePaths) => {
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

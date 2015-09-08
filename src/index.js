import {
    CLIEngine
} from 'eslint';

import path from 'path';

let getFormatter,
    lintFiles;

getFormatter = () => {
    return CLIEngine.getFormatter();
};

/**
 * @typedef lintFiles~message
 * @property {String} ruleId
 * @property {Number} severity
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 * @property {String} nodeType
 * @property {String} source
 */

/**
 * @typedef lintFiles~result
 * @property {String} filePath
 * @property {lintFiles~message[]} messages
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @typedef lintFiles~report
 * @property {Number} errorCount
 * @property {Number} warningCount
 * @property {lintFiles~result[]} results
 */

/**
 * @param {String[]} filePaths
 * @return {lintFiles~report}
 */
lintFiles = (filePaths) => {
    let cli,
        report;

    cli = new CLIEngine({
        useElintrc: false,
        baseConfig: path.resolve(__dirname, `./eslintrc.json`)
    });

    report = cli.executeOnFiles(filePaths);

    return report;
};

export {
    getFormatter,
    lintFiles
};

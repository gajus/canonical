import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import lintText from './lintText';
import syntaxMap from './../syntaxMap';

type LintFilesReportType = {
    results: Array,
    errorCount: number,
    warningCount: number
};

export default (filePaths: Array<string>): LintFilesReportType => {
    const report = {
        errorCount: 0,
        results: [],
        warningCount: 0
    };

    _.forEach(filePaths, (filePath) => {
        const extensionName = path.extname(filePath);

        if (syntaxMap[extensionName]) {
            const text = fs.readFileSync(filePath, {
                encoding: 'utf8'
            });

            const result = lintText(text, {
                syntax: syntaxMap[extensionName]
            });

            result.filePath = filePath;

            report.results.push(result);
            report.errorCount += result.errorCount;
            report.warningCount += result.warningCount;
        } else {
            /* eslint-disable no-console */
            console.warn('Ignoring file "' + filePath + '". No syntax mapped to "' + extensionName + '" extension.');
            /* eslint-enable no-console */
        }
    });

    return report;
};

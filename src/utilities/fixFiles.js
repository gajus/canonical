import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import fixText from './fixText';
import syntaxMap from './../syntaxMap';
import type {
    FixReportType
} from './../types';

export default (filePaths: Array<string>): FixReportType => {
    const report = {
        results: []
    };

    _.forEach(filePaths, (filePath) => {
        const extensionName = path.extname(filePath);

        if (syntaxMap[extensionName]) {
            const text = fs.readFileSync(filePath, 'utf8');
            const output = fixText(text, {
                syntax: syntaxMap[extensionName]
            });

            fs.writeFileSync(filePath, output);

            report.results.push({
                filePath,
                output
            });
        } else {
            /* eslint-disable no-console */
            console.warn('Ignoring file "' + filePath + '". No syntax mapped to "' + extensionName + '" extension.');
            /* eslint-enable no-console */
        }
    });

    return report;
};

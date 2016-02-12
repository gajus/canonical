import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import fixText from './fixText';
import syntaxMap from './../syntaxMap';

type ResultType = {
    filePath: string,
    output: string
};

type ReportType = {
    results: Array<ResultType>
};

export default (filePaths: Array<string>): ReportType => {
    const report = {
        results: []
    };

    _.forEach(filePaths, (filePath) => {
        const extensionName = path.extname(filePath);

        if (syntaxMap[extensionName]) {
            const result = {};

            let text = fs.readFileSync(filePath, 'utf8');

            text = fixText(text, {
                syntax: syntaxMap[extensionName]
            });
            text = fs.writeFileSync(filePath, text);

            result.filePath = filePath;
            result.output = text;

            report.results.push(result);
        } else {
            /* eslint-disable no-console */
            console.warn('Ignoring file "' + filePath + '". No syntax mapped to "' + extensionName + '" extension.');
            /* eslint-enable no-console */
        }
    });

    return report;
};

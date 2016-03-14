import _ from 'lodash';
import chalk from 'chalk';
import table from 'table';
import pluralize from 'pluralize';
import type {
    ReportType
} from './../types';

const drawTable = (messages: Array): string => {
    const rows = [];

    if (messages.length === 0) {
        return '';
    }

    rows.push([
        chalk.bold('Line'),
        chalk.bold('Column'),
        chalk.bold('Type'),
        chalk.bold('Message'),
        chalk.bold('Rule ID')
    ]);

    _.forEach(messages, (message) => {
        let messageType;

        if (message.fatal || message.severity === 2) {
            messageType = chalk.red('error');
        } else {
            messageType = chalk.yellow('warning');
        }

        rows.push([
            message.line || 0,
            message.column || 0,
            messageType,
            message.message.replace(/\.$/, ''),
            message.ruleId || ''
        ]);
    });

    return table(rows, {
        columns: {
            0: {
                width: 8,
                wrapWord: true
            },
            1: {
                width: 8,
                wrapWord: true
            },
            2: {
                width: 8,
                wrapWord: true
            },
            3: {
                paddingRight: 5,
                width: 50,
                wrapWord: true
            },
            4: {
                width: 20,
                wrapWord: true
            }
        },
        drawHorizontalLine: (index) => {
            return index === 1;
        }
    });
};

const drawReport = (results: Array): string => {
    let files;

    files = _.map(results, (result) => {
        if (!result.messages.length) {
            return '';
        }

        return result.filePath + '\n\n' + drawTable(result.messages);
    });

    files = _.filter(files);

    return files.join('\n');
};

export default (report: ReportType): string => {
    let result;

    result = '';

    if (report.errorCount || report.warningCount) {
        result = drawReport(report.results);
    }

    result += '\n' + table([
        [
            chalk.red(pluralize('Error', report.errorCount, true))
        ],
        [
            chalk.yellow(pluralize('Warning', report.warningCount, true))
        ]
    ], {
        columns: {
            0: {
                width: 110,
                wrapWord: true
            }
        },
        drawHorizontalLine: _.constant(true)
    });

    return result;
};

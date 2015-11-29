import chalk from 'chalk';
import table from 'table';
import _ from 'lodash';
import pluralize from 'pluralize';

let drawReport,
    drawTable;

/**
 * @param {Array} results
 * @returns {string}
 */
drawReport = (results) => {
    let files;

    files = _.map(results, (result) => {
        if (!result.messages.length) {
            return '';
        }

        return '\n' + result.filePath + '\n\n' + drawTable(result.messages);
    });

    files = _.filter(files);

    return files.join('\n');
};

/**
 * @param {Array} messages
 * @returns {string}
 */
drawTable = (messages) => {
    let rows;

    rows = [];

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
                width: 50,
                paddingRight: 5,
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

/**
 * @typedef {Object} report
 * @property {number} errorCount
 * @property {number} warningCount
 * @property {Object[]} results
 */

/**
 * @param {report} report
 * @returns {string}
 */
export default (report) => {
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
        drawHorizontalLine: () => {
            return true;
        }
    });

    return result;
};

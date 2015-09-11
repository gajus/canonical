import chalk from 'chalk';
import ASCIITable from 'ascii-table';
import pluralize from 'pluralize';
import _ from 'lodash';

let drawTable;

/**
 * @param {Object} results
 * @return {String}
 */
drawTable = (results) => {
    let output;

    output = '';
    // table.removeBorder();
    // table.setBorder(`|`, `-`, ``, ``);

    /* table.addRow([
        `Line`,
        `Column`,
        `Type`,
        `Message`,
        `Rule ID`
    ]); */

    _.forEach(results, (result) => {
        let table,
            messages;

        table = new ASCIITable();

        messages = result.messages;

        if (messages.length === 0) {
            return;
        }

        _.forEach(messages, (message) => {
            let messageType;

            if (message.fatal || message.severity === 2) {
                messageType = chalk.red(`error`);
            } else {
                messageType = chalk.yellow(`warning`);
            }

            table.addRow([
                message.line || 0,
                message.column || 0,
                messageType,
                message.message.replace(/\.$/, ``),
                message.ruleId || ``
            ]);
        });

        output += `\n\n${result.filePath}\n` + table.toString();
    });

    return output;
};

export default (report) => {
    let result;

    result = '';

    if (report.errorCount || report.warningCount) {
        result = drawTable(report.results);
    }

    return result;
};

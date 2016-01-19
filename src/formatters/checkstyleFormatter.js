import _ from 'lodash';
import builder from 'xmlbuilder';

let getMessageType;

/**
 * @param {lintText~message} message
 * @returns {string}
 */
getMessageType = (message) => {
    if (message.severity === 2) {
        return 'error';
    } else {
        return 'warning';
    }
};

/**
 * @see https://github.com/mila-labs/jshint-checkstyle-file-reporter
 * @param {lintFiles~report} report
 * @returns {string}
 */
export default (report) => {
    let xml;

    xml = builder
        .create('checkstyle');

    xml.att('version', '4.3');

    _.forEach(report.results, (fileReport) => {
        let fileNode;

        if (!fileReport.messages.length) {
            return;
        }

        fileNode = xml.ele('file', {
            name: fileReport.filePath
        });

        _.forEach(fileReport.messages, (message) => {
            fileNode.ele('error', {
                column: message.column,
                line: message.line,
                message: '[' + message.ruleId + '] ' + message.message,
                severity: getMessageType(message),
                source: ''
            });
        });
    });

    xml = xml.end({
        pretty: true
    });

    return xml;
};

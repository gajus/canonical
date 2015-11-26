import _ from 'lodash';

let getMessageType,
    getReportForFile;

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
 * @param {lintText~result} report
 * @returns {string}
 */
getReportForFile = (report) => {
    let output;

    output = '';
    output += '<file name="' + report.filePath + '">';

    output += _.map(report.messages, (message) => {
        return '<error line="' + message.line + '" ' +
            'column="' + message.column + '" ' +
            'severity="' + getMessageType(message) + '" ' +
            'source="" ' +
            'message="[' + message.ruleId + '] ' + message.message + '" />';
    }).join('');

    output += '</file>';

    return output;
};

/**
 * @param {lintFiles~report} report
 * @returns {string}
 */
export default (report) => {
    let output;

    output = '';

    output += '<?xml version="1.0" encoding="utf-8"?>';
    output += '<checkstyle version="4.3">';

    output += _.map(report.results, getReportForFile).join('');

    output += '</checkstyle>';

    return output;
};

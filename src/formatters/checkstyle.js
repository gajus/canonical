import _ from 'lodash';

let getMessageType,
    getReportForFile,
    xmlEscape;

/**
 * Returns the escaped value for a character
 *
 * @param {string} str string to examine
 * @returns {string}
 */
xmlEscape = (str) => {
    return (String(str)).replace(/[<>&"']/g, (char) => {
        switch (char) {
        case '<':
            return '&lt;';
        case '>':
            return '&gt;';
        case '&':
            return '&amp;';
        case '"':
            return '&quot;';
        case '\'':
            return '&apos;';
        }
    });
};

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
    output += '<file name="' + xmlEscape(report.filePath) + '">';

    output += _.map(report.messages, (message) => {
        return '<error line="' + xmlEscape(message.line) + '" ' +
            'column="' + xmlEscape(message.column) + '" ' +
            'severity="' + xmlEscape(getMessageType(message)) + '" ' +
            'source="" ' +
            'message="[' + xmlEscape(message.ruleId) + '] ' + xmlEscape(message.message) + ' "/>';
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

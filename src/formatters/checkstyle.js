let getReportForFile,
    getMessageType;

/**
 * @param {lintText~message} message
 * @returns {string}
 */
getMessageType = (message) => {
    if (message.severity === 2) {
        return "error";
    } else {
        return "warning";
    }
};

/**
 * @param {lintText~result} report
 * @returns {string}
 */
getReportForFile =(report) => {
    let output;

    output = '';
    output += '<file name="' + report.filePath + '">';

    output += report.messages.map((message) => {
        return '<error line="' + message.line + '" ' +
            'column="' + message.column + '" ' +
            'severity="' + getMessageType(message) + '" ' +
            'message="[' + message.ruleId + '] ' + message.message + '" />';
    }).join('\n');

    output += '</file>';

    return output;
};

/**
 * @param {lintFiles~report} report
 * @returns {string}
 */
export default (report) => {
    let output;

    output = "";

    output += '<?xml version="1.0" encoding="utf-8"?>\n';
    output += '<checkstyle version="4.3">\n';

    output += report.results.map(getReportForFile).join('\n');

    output += "</checkstyle>";

    return output;
};

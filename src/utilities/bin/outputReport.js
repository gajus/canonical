import {
    getFormatter
} from './../../';

/**
 * @param {Object} report
 * @param {string} outputForamtName
 * @returns {undefined}
 */
export default (report, outputForamtName) => {
    let output;

    if (outputForamtName === 'json') {
        output = JSON.stringify(report, '', 4);
    } else {
        let formatter;

        formatter = getFormatter(outputForamtName);
        output = formatter(report);
    }

    /* eslint-disable no-console */
    console.log(output);
    /* eslint-enable no-console */
};

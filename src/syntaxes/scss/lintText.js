import SassLinter from 'css-lint';
import path from 'path';

/**
 * @param {string} text
 * @returns {string}
 */
export default (text) => {
    let report;

    report = SassLinter.lintText({
        filename: '<text>',
        format: 'scss',
        text
    }, {}, path.resolve(__dirname, './css-lint.yml'));

    return report;
};

import SassLinter from 'css-lint';
import path from 'path';

let lintText;

/**
 * @param {string} text
 * @returns {string}
 */
lintText = (text) => {
    let report;

    report = SassLinter.lintText({
        filename: '<text>',
        format: 'scss',
        text
    }, {}, path.resolve(__dirname, './css-lint.yml'));

    return report;
};

export {
    lintText
};

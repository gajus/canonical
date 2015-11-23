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
        text: text,
        filename: '<text>',
        format: 'scss'
    }, {}, path.resolve(__dirname, './css-lint.yml'));

    return report;
};

export {
    lintText
};

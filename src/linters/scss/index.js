import SassLinter from 'sass-lint';
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
    }, {}, path.resolve(__dirname, './sass-lint.yml'));

    return report;
};

export {
    lintText
};

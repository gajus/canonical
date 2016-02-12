import SassLinter from 'css-lint';
import path from 'path';

export default (text: string): string => {
    const report = SassLinter.lintText({
        filename: '<text>',
        format: 'scss',
        text
    }, {}, path.resolve(__dirname, './css-lint.yml'));

    return report;
};

import _ from 'lodash';

import {
    CLIEngine
} from 'eslint';

const cli = new CLIEngine({
    allowInlineConfig: true,
    baseConfig: false,
    configFile: require.resolve('./eslintrc.json'),
    envs: [],
    extensions: [],
    fix: true,
    globals: [],
    parser: require.resolve('babel-eslint'),
    rulePaths: [],
    useEslintrc: false
});

const fixText = (text: string): string => {
    const report = cli.executeOnText(text).results[0];

    const fatalError = _.find(report.messages, {
        fatal: true
    });

    if (fatalError) {
        throw new Error(fatalError.message + ' (line: ' + fatalError.line + ', column: ' + fatalError.column + ').');
    }

    return report.output || text;
};

export default (text: string): string => {
    let input,
        maxIterationCount,
        output;

    maxIterationCount = 100;
    output = text;

    // @see https://github.com/eslint/eslint/issues/5004

    do {
        input = output;

        output = fixText(input);

        if (--maxIterationCount < 0) {
            throw new Error('Max iteration count.');
        }
    } while (output !== input);

    return output;
};

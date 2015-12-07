import {
    CLIEngine
} from 'eslint';

let cli,
    lintText;

cli = new CLIEngine({
    configFile: require.resolve('./eslintrc.json'),
    baseConfig: false,
    rulePaths: [],
    useEslintrc: false,
    envs: [],
    globals: [],
    extensions: [],
    parser: require.resolve('babel-eslint'),
    fix: false,
    allowInlineConfig: true
});

/**
 * @param {string} text
 * @returns {string}
 */
lintText = (text) => {
    return cli.executeOnText(text).results[0];
};

export {
    lintText
};

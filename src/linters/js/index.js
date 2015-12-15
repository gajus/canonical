import {
    CLIEngine
} from 'eslint';

let cli,
    lintText;

cli = new CLIEngine({
    allowInlineConfig: true,
    baseConfig: false,
    configFile: require.resolve('./eslintrc.json'),
    envs: [],
    extensions: [],
    fix: false,
    globals: [],
    parser: require.resolve('babel-eslint'),
    rulePaths: [],
    useEslintrc: false
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

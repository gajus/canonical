import {
    CLIEngine
} from 'eslint';

let cli;

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

export default (text: string) => {
    return cli.executeOnText(text).results[0];
};

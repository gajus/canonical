import {
    CLIEngine
} from 'eslint';

import path from 'path';

let cli,
    lintText;

cli = new CLIEngine({
    useElintrc: false,
    // baseConfig: false,
    parser: 'babel-eslint',
    baseConfig: path.resolve(__dirname, './eslintrc.json')
});

/**
 * @param {string} text
 * @returns {string}
 */
lintText = (text) => {
    // console.log('cli.executeOnText(text).results[0]', cli.executeOnText(text).results[0]);

    return cli.executeOnText(text).results[0];
};

export {
    lintText
};

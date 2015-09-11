import {
    CLIEngine
} from 'eslint';

import path from 'path';

let cli,
    lintText,
    lintFiles;

cli = new CLIEngine({
    useElintrc: false,
    // The './../../../src/linters/js/' path is required to accommodate that the script thats being executed is located in ./dist/ path.
    baseConfig: path.resolve(__dirname, `./../../../src/linters/js/eslintrc.json`)
});

lintText = (text) => {
    return cli.executeOnText(text).results[0];
};

export {
    lintText
};

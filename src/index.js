import {
    linter as Linter
} from 'standard-engine';

import pkg from './../package.json';

import path from 'path';

new Linter({
    cmd: 'mores',
    version: pkg.version,
    eslintConfig: {
        configFile: path.join(__dirname, './eslintrc.json')
    }
});
console.log('pkg', pkg);

import {
    lintFiles,
    getFormatter
} from './../';

import {
    argv
} from 'yargs';

import path from 'path';

import _ from 'lodash';

let resolveAbsolutePath,
    getTargetPaths,
    targetPaths,
    report,
    formatter;

formatter = getFormatter();

/**
 * @param {String} relativePath Path relative to the process.cwd()
 * @return {String} Absolute path.
 */
resolveAbsolutePath = (relativePath) => {
    return path.resolve(process.cwd(), relativePath);
};

/**
 * @return {String[]}
 */
getTargetPaths = () => {
    let paths;

    if (argv._.length) {
        paths = argv._;
    } else {
        paths = [`./`];
    }

    paths = _.map(paths, resolveAbsolutePath);

    // @todo glob

    return paths;
};

targetPaths = getTargetPaths();

// console.log('targetPaths', targetPaths);

report = lintFiles(targetPaths);

// console.log('report', report.results[0]);

console.log(formatter(report.results));

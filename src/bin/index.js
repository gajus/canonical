import {
    lintFiles,
    getFormatter
} from './../';

import {
    argv
} from 'yargs';

import glob from 'globby';
import path from 'path';
import _ from 'lodash';

let formatter,
    getTargetPaths,
    report,
    resolveAbsolutePath,
    targetPaths;

formatter = getFormatter();

/**
 * @param {string} relativePath Path relative to the process.cwd()
 * @returns {string} Absolute path.
 */
resolveAbsolutePath = (relativePath) => {
    return path.resolve(process.cwd(), relativePath);
};

/**
 * @returns {string[]}
 */
getTargetPaths = () => {
    let appendPaths,
        paths;

    appendPaths = [];

    if (argv._.length) {
        paths = argv._;
    } else {
        paths = ['./'];
    }

    paths = _.filter(paths, (pathName) => {
        let exclude;

        exclude = _.endsWith(pathName, '/') === true;

        if (exclude) {
            appendPaths.push(pathName + '**/*.js');
            appendPaths.push(pathName + '**/*.css');
            appendPaths.push(pathName + '**/*.scss');
        }

        return !exclude;
    });

    paths = paths.concat(appendPaths);
    paths = _.unique(paths);

    paths = glob.sync(paths);
    // @todo Test whether glob.sync can return non-unique file paths.
    // paths = _.unique(paths);

    // console.log('paths', paths);

    paths = _.map(paths, resolveAbsolutePath);

    // console.log('paths', paths);

    return paths;
};

targetPaths = getTargetPaths();

// console.log('targetPaths', targetPaths);

report = lintFiles(targetPaths);

// console.log('report', report.results[0]);

/* eslint-disable no-console */
console.log(formatter(report));
/* eslint-enable no-console */

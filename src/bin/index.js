#! /usr/bin/env node

import getStdin from 'get-stdin';

import {
    lintFiles,
    lintText,
    getFormatter
} from './../';

import yargs, {
    argv
} from 'yargs';

import glob from 'globby';
import path from 'path';
import _ from 'lodash';

let getTargetPaths,
    outputReport,
    resolveAbsolutePath,
    targetPaths;

yargs
    .options({
        stdin: {
            describe: 'Used to indicate that subject body will be read from stdin.',
            type: 'boolean',
            default: false
        },
        outputFormat: {
            choices: [
                'json',
                'checkstyle',
                'table'
            ],
            default: 'table'
        },
        filePath: {
            describe: 'Name of the file being linted with stdin (if any). Used in reporting',
            type: 'string',
            default: '<text>'
        }
    })
    .argv;

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

/**
 * @param {Object} report
 * @returns {undefined}
 */
outputReport = (report) => {
    let formatter,
        output;

    if (argv.outputFormat === 'json') {
        output = JSON.stringify({
            messages: report.messages,
            errorCount: report.errorCount,
            warningCount: report.warningCount
        }, '', 4);
    } else {
        formatter = getFormatter(argv.outputFormat);

        if (argv.stdin) {
            report.filePath = argv.filePath;
            output = formatter({
                results: [
                    report
                ],
                errorCount: report.errorCount,
                warningCount: report.warningCount
            });
        } else {
            output = formatter(report);
        }
    }

    /* eslint-disable no-console */
    console.log(output);
    /* eslint-enable no-console */
};

if (argv.stdin) {
    yargs
        .options({
            linter: {
                demand: true,
                describe: 'The type of input.',
                choices: [
                    'js',
                    'scss'
                ]
            }
        })
        .argv;

    getStdin()
        .then((stdin) => {
            let report;

            report = lintText(stdin, {
                linter: argv.linter
            });

            // console.log('BEST', stdin, argv.linter, lintText);

            outputReport(report);
        });
} else {
    let report;

    targetPaths = getTargetPaths();

    // console.log('targetPaths', targetPaths);

    report = lintFiles(targetPaths);

    outputReport(report);
}

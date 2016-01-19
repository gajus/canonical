#! /usr/bin/env node

import getStdin from 'get-stdin';
import chalk from 'chalk';

import {
    lintFiles,
    lintText
} from './../';

import yargs, {
    argv
} from 'yargs';

import getTargetPaths from './../utilities/bin/getTargetPaths';
import outputReport from './../utilities/bin/outputReport';

let targetPaths;

process.on('unhandledRejection', (reason, promise) => {
    /* eslint-disable no-console */
    console.log(chalk.red('Unhandled'), reason, promise);
    /* eslint-enable */

    throw reason;
});

/* eslint-disable no-unused-expressions */
yargs
/* eslint-enable */
    .help('help')
    .fail((message) => {
        /* eslint-disable no-console */
        console.log(chalk.red('Error'), message);
        /* eslint-enable */

        /* eslint-disable no-process-exit */
        process.exit(1);
        /* eslint-enable */
    })
    .strict()
    .options({
        'file-path': {
            default: '<text>',
            describe: 'Name of the file being linted with stdin (if any). Used in reporting.',
            type: 'string'
        },
        fix: {
            default: false,
            describe: 'Used to automatically fix linting issues when possible. Works only when linting target is a file (does not work with stdin input).',
            type: 'boolean'
        },
        linter: {
            // @todo This need to be true when using stdin.
            choices: [
                'js',
                'scss'
            ],
            demand: false,
            describe: 'The type of input.'
        },
        'output-format': {
            choices: [
                'json',
                'checkstyle',
                'table'
            ],
            default: 'table'
        },
        stdin: {
            default: false,
            describe: 'Used to indicate that subject body will be read from stdin.',
            type: 'boolean'
        }
    })
    .argv;

if (argv.stdin) {
    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(0, 0)
        .argv;

    getStdin()
        .then((stdin) => {
            let report;

            report = lintText(stdin, {
                filePath: argv.filePath,
                linter: argv.linter
            });

            outputReport({
                errorCount: report.errorCount,
                results: [
                    report
                ],
                warningCount: report.warningCount
            }, argv.outputFormat);
        });
} else {
    let report;

    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(1)
        .argv;

    targetPaths = getTargetPaths(argv._);

    report = lintFiles(targetPaths);

    outputReport(report, argv.outputFormat);
}

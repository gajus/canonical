import yargs from 'yargs';
import _ from 'lodash';

import getStdin from 'get-stdin';

import {
    lintFiles,
    lintText
} from './../../utilities';

import {
    failHandler,
    getTargetPaths,
    outputReport
} from './../../utilities/bin';

let handleStdin,
    handleFilePaths;

handleStdin = (yargs, argv) => {
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
                syntax: argv.syntax
            });

            outputReport({
                errorCount: report.errorCount,
                results: [
                    report
                ],
                warningCount: report.warningCount
            }, argv.outputFormat);
        });
};

handleFilePaths = (yargs, argv) => {
    let report,
        targetPaths;

    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(1)
        .argv;

    targetPaths = getTargetPaths(argv._);

    report = lintFiles(targetPaths);

    outputReport(report, argv.outputFormat);
};

export default () => {
    let argv;

    argv = yargs(process.argv.splice(3))
        .fail(failHandler)
        .help('help')
        .strict()
        .options({
            'file-path': {
                default: '<text>',
                describe: 'Name of the file being linted with stdin (if any). Used in reporting.',
                type: 'string'
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
            },
            syntax: {
                // @todo This need to be true when using stdin.
                choices: [
                    'js',
                    'css',
                    'scss'
                ],
                demand: false,
                describe: 'Syntax of the input.'
            }
        })
        .argv;

    if (argv.stdin) {
        handleStdin(yargs, argv);
    } else {
        handleFilePaths(yargs, argv);
    }
};

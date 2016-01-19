import yargs from 'yargs';
import _ from 'lodash';

import getStdin from 'get-stdin';

import {
    fixFiles,
    fixText
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
            let result;

            result = fixText(stdin, {
                syntax: argv.syntax
            });

            console.log(result);
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

    report = fixFiles(targetPaths);

    console.log(report);
};

export default () => {
    let argv;

    argv = yargs(process.argv.splice(3))
        .fail(failHandler)
        .help('help')
        .strict()
        .options({
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

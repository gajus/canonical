import yargs from 'yargs';
import getStdin from 'get-stdin';
import {
    fixFiles,
    fixText
} from './../../utilities';
import {
    failHandler,
    getTargetPaths
} from './../../utilities/bin';

let handleFilePaths,
    handleStdin;

handleStdin = (argv) => {
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

            /* eslint-disable no-console */
            console.log(result);
            /* eslint-enable */
        });
};

handleFilePaths = (argv) => {
    let report,
        targetPaths;

    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(1)
        .argv;

    targetPaths = getTargetPaths(argv._);

    report = fixFiles(targetPaths);

    /* eslint-disable no-console */
    console.log(report);
    /* eslint-enable */
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
                    'css',
                    'js',
                    'json',
                    'scss'
                ],
                demand: false,
                describe: 'Syntax of the input.'
            }
        })
        .argv;

    if (argv.stdin) {
        handleStdin(argv);
    } else {
        handleFilePaths(argv);
    }
};

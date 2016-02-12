import yargs from 'yargs';
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

const handleStdin = (argv) => {
    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(0, 0)
        .argv;

    getStdin()
        .then((stdin) => {
            const report = lintText(stdin, {
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

const handleFilePaths = (argv) => {
    /* eslint-disable no-unused-expressions */
    yargs
    /* eslint-enable */
        .demand(1)
        .argv;

    const targetPaths = getTargetPaths(argv._);

    const report = lintFiles(targetPaths);

    outputReport(report, argv.outputFormat);
};

export default (subYargs) => {
    subYargs
        .exitProcess(false)
        .fail(failHandler);

    const argv = yargs(process.argv.splice(3))
        .exitProcess(false)
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

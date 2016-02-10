#! /usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import {
    fixCommand,
    lintCommand
} from './commands';
import {
    failHandler
} from './../utilities/bin';

process.on('unhandledRejection', (reason, promise) => {
    /* eslint-disable no-console */
    console.log(chalk.red('Unhandled'), reason, promise);
    /* eslint-enable */

    throw reason;
});

/* eslint-disable no-unused-expressions */
yargs
/* eslint-enable */
    .fail(failHandler)
    .help('help')
    .strict()
    .command('fix', 'Fix code format.', fixCommand)
    .command('lint', 'Report code format errors.', lintCommand)
    .argv;

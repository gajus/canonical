import chalk from 'chalk';

export default (message) => {
    /* eslint-disable no-console */
    console.log(chalk.red('Error'), message);
    /* eslint-enable */

    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable */
};

import chalk from 'chalk';

export default (message, err) => {
    /* eslint-disable no-console */
    console.log(chalk.red('Error'), message, err.stack);
    /* eslint-enable */
};

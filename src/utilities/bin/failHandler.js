import chalk from 'chalk';

export default (message, err) => {
    /* eslint-disable no-console */
    if (err) {
        console.log(chalk.red('Error'), message, err.stack);
    } else {
        console.log(chalk.red('Error'), message);
    }
    /* eslint-enable */
};

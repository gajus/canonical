import tableFormatter from './formatters/table';
import checkstyleFormatter from './formatters/checkstyle';

/**
 * @param {string} name Default: table
 * @return {Function}
 */
export default (name) => {
    if (name === 'checkstyle') {
        return checkstyleFormatter;
    }

    if (name === 'table') {
        return tableFormatter;
    }

    throw new Error('Unknown formatter ("' + name + '").');
};

import tableFormatter from './formatters/table';
import checkstyleFormatter from './formatters/checkstyle';

/**
 * @param {string} name Default: table
 * @returns {Function}
 */
export default (name = 'table') => {
    if (name === 'checkstyle') {
        return checkstyleFormatter;
    }

    if (name === 'table') {
        return tableFormatter;
    }

    throw new Error('Unknown formatter ("' + name + '").');
};

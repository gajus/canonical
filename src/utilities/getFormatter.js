import {
    tableFormatter,
    checkstyleFormatter
} from './../formatters';

export default (name: string = 'table'): Function => {
    if (name === 'checkstyle') {
        return checkstyleFormatter;
    }

    if (name === 'table') {
        return tableFormatter;
    }

    throw new Error('Unknown formatter ("' + name + '").');
};

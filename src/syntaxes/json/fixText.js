import sortObject from 'deep-sort-object';

export default (text: string): string => {
    let data;

    data = JSON.parse(text);

    data = sortObject(data);

    data = JSON.stringify(data, null, '    ');

    return data;
};

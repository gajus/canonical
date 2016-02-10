import {
    lintText as lintJsText
} from './../syntaxes/js';

import {
    lintText as lintJsonText
} from './../syntaxes/json';

import {
    lintText as lintScssText
} from './../syntaxes/scss';

type MessageType = {
    ruleId: string,
    severity: number,
    message: string,
    line: number,
    column: number,
    nodeType: string,
    source: string
};

type LintTextResult = {
    filePath: string,
    messages: Array<MessageType>,
    errorCount: number,
    warningCount: number
};

type OptionsType = {
    syntax: string,
    filePath: string
};

export default (text: string, options: OptionsType): LintTextResult => {
    let result;

    if (options.syntax === 'css') {
        result = lintScssText(text);
    } else if (options.syntax === 'js') {
        result = lintJsText(text);
    } else if (options.syntax === 'json') {
        result = lintJsonText(text);
    } else if (options.syntax === 'scss') {
        result = lintScssText(text);
    } else {
        throw new Error('Unknown syntax "' + options.syntax + '".');
    }

    if (options.filePath) {
        result.filePath = options.filePath;
    }

    return result;
};

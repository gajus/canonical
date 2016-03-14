export type LintMessageType = {
    ruleId: string,
    severity: number,
    message: string,
    line: number,
    column: number,
    nodeType: string,
    source: string
};

export type LintResultType = {
    filePath: string,
    messages: Array<LintMessageType>,
    errorCount: number,
    warningCount: number
};

export type LintReportType = {
    errorCount: number,
    warningCount: number,
    results: Array<LintResultType>
};

export type FixResultType = {
    filePath: string,
    output: string
};

export type FixReportType = {
    results: Array<FixResultType>
};

export type LintOptionsType = {
    syntax: ?string,
    filePath: ?string
};

export type FixOptionsType = {
    syntax: string
};

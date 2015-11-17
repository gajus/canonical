'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lintFiles = exports.lintText = exports.getFormatter = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _canonical = require('./formatters/canonical');

var _canonical2 = _interopRequireDefault(_canonical);

var _js = require('./linters/js/');

var _scss = require('./linters/scss/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFormatter = undefined,
    lintFiles = undefined,
    lintText = undefined,
    linterMap = undefined;

linterMap = {
    '.js': 'js',
    '.css': 'scss',
    '.scss': 'scss'
};

/**
 * @return {Function}
 */
exports.getFormatter = getFormatter = function () {
    return _canonical2.default;
};

/**
 * @typedef lintText~message
 * @property {string} ruleId
 * @property {number} severity
 * @property {string} message
 * @property {number} line
 * @property {number} column
 * @property {string} nodeType
 * @property {string} source
 */

/**
 * @typedef lintText~result
 * @property {string} filePath
 * @property {lintFiles~message[]} messages
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @typedef lintText~options
 * @property {string} language (supported languages: 'js', 'scss').
 */

/**
 * @param {string} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
exports.lintText = lintText = function (text, options) {
    var result = undefined;

    if (options.linter === 'js') {
        result = (0, _js.lintText)(text);
    } else if (options.linter === 'scss') {
        result = (0, _scss.lintText)(text);
    } else {
        throw new Error('Unknown linter "' + options.linter + '".');
    }

    return result;
};

/**
 * @typedef lintFiles~report
 * @property {lintText~result[]} results
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @param {string[]} filePaths
 * @return {lintFiles~report}
 */
exports.lintFiles = lintFiles = function (filePaths) {
    var report = undefined;

    report = {};
    report.results = [];
    report.errorCount = 0;
    report.warningCount = 0;

    _lodash2.default.forEach(filePaths, function (filePath) {
        var extensionName = undefined,
            result = undefined,
            text = undefined;

        extensionName = _path2.default.extname(filePath);

        if (linterMap[extensionName]) {
            text = _fs2.default.readFileSync(filePath, {
                encoding: 'utf8'
            });

            result = lintText(text, {
                linter: linterMap[extensionName]
            });

            result.filePath = filePath;

            report.results.push(result);
            report.errorCount += result.errorCount;
            report.warningCount += result.warningCount;
        } else {
            /* eslint-disable no-console */
            console.warn('Ignoring file "' + filePath + '". No linter mapped to "' + extensionName + '" extension.');
            /* eslint-enable no-console */
        }
    });

    return report;
};

exports.getFormatter = getFormatter;
exports.lintText = lintText;
exports.lintFiles = lintFiles;
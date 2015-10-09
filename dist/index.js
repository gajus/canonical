'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formattersCanonical = require('./formatters/canonical');

var _formattersCanonical2 = _interopRequireDefault(_formattersCanonical);

var _lintersJs = require('./linters/js/');

/* import {
    lintText as lintSCSSText
} from './linters/scss/'; */

var getFormatter = undefined,
    lintText = undefined,
    lintFiles = undefined,
    linterMap = undefined;

linterMap = {
    '.js': 'js'
    // '.css': 'scss',
    // '.scss': 'scss'
};

/**
 * @return {Function}
 */
exports.getFormatter = getFormatter = function () {
    return _formattersCanonical2['default'];
};

/**
 * @typedef lintText~message
 * @property {String} ruleId
 * @property {Number} severity
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 * @property {String} nodeType
 * @property {String} source
 */

/**
 * @typedef lintText~result
 * @property {String} filePath
 * @property {lintFiles~message[]} messages
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @typedef lintText~options
 * @property {String} language (supported languages: 'js', 'scss').
 */

/**
 * @param {String} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
exports.lintText = lintText = function (text, options) {
    var result = undefined;

    if (options.linter === 'js') {
        result = (0, _lintersJs.lintText)(text);
        // } else if (options.linter === 'scss') {
        //    result = lintSCSSText(text)
    } else {
            throw new Error('Unknown linter "' + options.linter + '".');
        }

    return result;
};

/**
 * @typedef lintFiles~report
 * @property {lintText~result[]} results
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @param {String[]} filePaths
 * @return {lintFiles~report}
 */
exports.lintFiles = lintFiles = function (filePaths) {
    var report = undefined;

    report = {};
    report.results = [];
    report.errorCount = 0;
    report.warningCount = 0;

    _lodash2['default'].forEach(filePaths, function (filePath) {
        var extensionName = undefined,
            result = undefined,
            text = undefined;

        extensionName = _path2['default'].extname(filePath);

        if (linterMap[extensionName]) {
            text = _fs2['default'].readFileSync(filePath, {
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
            console.warn('Ignoring file "' + filePath + '". No linter mapped to "' + extensionName + '" extension.');
        }
    });

    return report;
};

exports.getFormatter = getFormatter;
exports.lintText = lintText;
exports.lintFiles = lintFiles;
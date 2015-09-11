'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eslint = require('eslint');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var cli = undefined,
    formatReport = undefined,
    getFormatter = undefined,
    lintText = undefined,
    lintFiles = undefined;

cli = new _eslint.CLIEngine({
    useElintrc: false,
    // The './../src/' path is required to accommodate that the script thats being executed is located in ./dist/ path.
    baseConfig: _path2['default'].resolve(__dirname, './../src/eslintrc.json')
});

/**
 * @return {Function}
 */
exports.getFormatter = getFormatter = function () {
    return _eslint.CLIEngine.getFormatter();
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
 * @param {String} text
 * @return {lintText~result}
 */
exports.lintText = lintText = function (text) {
    return cli.executeOnText(text);
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
    return cli.executeOnFiles(filePaths);
};

exports.getFormatter = getFormatter;
exports.lintText = lintText;
exports.lintFiles = lintFiles;
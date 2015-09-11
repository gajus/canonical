'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eslint = require('eslint');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var cli = undefined,
    lintText = undefined,
    lintFiles = undefined;

cli = new _eslint.CLIEngine({
    useElintrc: false,
    // The './../../../src/linters/javascript/' path is required to accommodate that the script thats being executed is located in ./dist/ path.
    baseConfig: _path2['default'].resolve(__dirname, './../../../src/linters/javascript/eslintrc.json')
});

exports.lintText = lintText = function (text) {
    return cli.executeOnText(text);
};

exports.lintFiles = lintFiles = function (filePaths) {
    return cli.executeOnFiles(filePaths);
};

exports.lintText = lintText;
exports.lintFiles = lintFiles;
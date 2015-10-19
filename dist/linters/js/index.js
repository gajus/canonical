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
    // baseConfig: false,
    parser: 'babel-eslint',
    baseConfig: _path2['default'].resolve(__dirname, './eslintrc.json')
});

/**
 * @param {String} text
 */
exports.lintText = lintText = function (text) {
    return cli.executeOnText(text).results[0];
};

exports.lintText = lintText;
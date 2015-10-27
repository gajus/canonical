'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sassLint = require('sass-lint');

var _sassLint2 = _interopRequireDefault(_sassLint);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var lintText = undefined;

/**
 * @param {string} text
 * @returns {string}
 */
exports.lintText = lintText = function (text) {
    var report = undefined;

    report = _sassLint2['default'].lintText({
        text: text,
        filename: '<text>',
        format: 'scss'
    }, {}, _path2['default'].resolve(__dirname, '.sass-lint.yml'));

    return report;
};

exports.lintText = lintText;
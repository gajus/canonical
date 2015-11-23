'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lintText = undefined;

var _cssLint = require('css-lint');

var _cssLint2 = _interopRequireDefault(_cssLint);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lintText = undefined;

/**
 * @param {string} text
 * @returns {string}
 */
exports.lintText = lintText = function (text) {
    var report = undefined;

    report = _cssLint2.default.lintText({
        text: text,
        filename: '<text>',
        format: 'scss'
    }, {}, _path2.default.resolve(__dirname, './css-lint.yml'));

    return report;
};

exports.lintText = lintText;
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _table = require('table');

var _table2 = _interopRequireDefault(_table);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var drawReport = undefined,
    drawTable = undefined;

/**
 * @param {Array} results
 * @return {string}
 */
drawReport = function (results) {
    var files = undefined;

    files = _lodash2['default'].map(results, function (result) {
        if (!result.messages.length) {
            return;
        }

        return '\n' + result.filePath + '\n\n' + drawTable(result.messages);
    });

    return files.join('\n');
};

/**
 * @param {Array} messages
 * @return {string}
 */
drawTable = function (messages) {
    var rows = undefined,
        output = undefined;

    rows = [];

    if (messages.length === 0) {
        return;
    }

    rows.push([_chalk2['default'].bold('Line'), _chalk2['default'].bold('Column'), _chalk2['default'].bold('Type'), _chalk2['default'].bold('Message'), _chalk2['default'].bold('Rule ID')]);

    _lodash2['default'].forEach(messages, function (message) {
        var messageType = undefined;

        if (message.fatal || message.severity === 2) {
            messageType = _chalk2['default'].red('error');
        } else {
            messageType = _chalk2['default'].yellow('warning');
        }

        rows.push([message.line || 0, message.column || 0, messageType, message.message.replace(/\.$/, ''), message.ruleId || '']);
    });

    return (0, _table2['default'])(rows, {
        columns: {
            0: {
                width: 8,
                wrapWord: true
            },
            1: {
                width: 8,
                wrapWord: true
            },
            2: {
                width: 8,
                wrapWord: true
            },
            3: {
                width: 50,
                paddingRight: 5,
                wrapWord: true
            },
            4: {
                width: 20,
                wrapWord: true
            }
        },
        drawHorizontalLine: function drawHorizontalLine(index) {
            return index === 1;
        }
    });
};

/**
 * @typedef {Object} report
 * @property {number} errorCount
 * @property {number} warningCount
 * @property {Object[]} results
 */

/**
 * @param {report} report
 * @returns {string}
 */

exports['default'] = function (report) {
    var result = undefined;

    result = '';

    if (report.errorCount || report.warningCount) {
        result = drawReport(report.results);
    }

    return result;
};

module.exports = exports['default'];
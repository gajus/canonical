'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _asciiTable = require('ascii-table');

var _asciiTable2 = _interopRequireDefault(_asciiTable);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var drawTable = undefined;

/**
 * @param {Object} results
 * @return {String}
 */
drawTable = function (results) {
    var table = undefined;

    table = new _asciiTable2['default']();
    // table.removeBorder();
    table.setBorder(_chalk2['default'].grey('|'), _chalk2['default'].grey('-'), '', '');

    table.addRow([_chalk2['default'].bold('Line'), _chalk2['default'].bold('Column'), _chalk2['default'].bold('Type'), _chalk2['default'].bold('Message'), _chalk2['default'].bold('Rule ID')]);

    _lodash2['default'].forEach(results, function (result) {
        var messages = undefined;

        messages = result.messages;

        if (messages.length === 0) {
            return;
        }

        _lodash2['default'].forEach(messages, function (message) {
            var messageType = undefined;

            if (message.fatal || message.severity === 2) {
                messageType = _chalk2['default'].red('error');
            } else {
                messageType = _chalk2['default'].yellow('warning');
            }

            table.addRow([message.line || 0, message.column || 0, messageType, message.message.replace(/\.$/, ''), _chalk2['default'].gray(message.ruleId || '')]);
        });
    });

    return table.toString();
};

exports['default'] = function (report) {
    var result = undefined;

    result = '';

    if (report.errorCount || report.warningCount) {
        result = drawTable(report.results);
    }

    return result;
};

module.exports = exports['default'];
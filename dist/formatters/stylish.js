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

exports['default'] = function (results) {
    var table = undefined;

    table = new _asciiTable2['default']();
    table.removeBorder();

    _lodash2['default'].forEach(results, function (result) {
        var messages = undefined;

        messages = result.messages;

        if (messages.length === 0) {
            return;
        }

        _lodash2['default'].forEach(messages, function (message) {
            message;
        });
    });

    table.addRow('a', 'b', 'c');

    console.log(table.toString());

    /*let output,
        total,
        errorCount,
        warningCount,
        summaryColor;
     output = `\n`;
    total = 0;
    errorCount = 0;
    warningCount = 0;
    summaryColor = `yellow`;
     _.forEach(results, (result) => {
        let messages;
         messages = result.messages;
         if (messages.length === 0) {
            return;
        }
         total += messages.length;
        output += chalk.underline(result.filePath) + `\n`;
         output += table(
            messages.map((message) => {
                let messageType;
                 if (message.fatal || message.severity === 2) {
                    messageType = chalk.red(`error`);
                    summaryColor = `red`;
                    errorCount++;
                } else {
                    messageType = chalk.yellow(`warning`);
                    warningCount++;
                }
                 return [
                    ``,
                    message.line || 0,
                    message.column || 0,
                    messageType,
                    message.message.replace(/\.$/, ``),
                    chalk.gray(message.ruleId || ``)
                ];
            }),
            {
                align: [
                    ``,
                    `r`,
                    `l`
                ],
                stringLength: (str) => {
                    return chalk.stripColor(str).length;
                }
            }
        ).split(`\n`).map((el) => {
            return el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) => {
                return chalk.gray(p1 + `:` + p2);
            });
        }).join(`\n`) + "\n\n";
    });
     if (total > 0) {
        output += chalk[summaryColor].bold(`\u2716 ${pluralize(` problem`, total, true)} ${pluralize(` error`, errorCount, true)} ${pluralize(` warning`, warningCount, true)}\n`);
    }
     return total > 0 ? output : ``;*/
};

module.exports = exports['default'];
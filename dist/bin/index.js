'use strict';

var _getStdin = require('get-stdin');

var _getStdin2 = _interopRequireDefault(_getStdin);

var _2 = require('./../');

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTargetPaths = undefined,
    outputReport = undefined,
    resolveAbsolutePath = undefined,
    targetPaths = undefined;

_yargs2.default.options({
    stdin: {
        describe: 'Used to indicate that subject body will be read from stdin.',
        type: 'boolean',
        default: false
    },
    outputFormat: {
        choices: ['json', 'table'],
        default: 'table'
    }
}).argv;

/**
 * @param {string} relativePath Path relative to the process.cwd()
 * @returns {string} Absolute path.
 */
resolveAbsolutePath = function (relativePath) {
    return _path2.default.resolve(process.cwd(), relativePath);
};

/**
 * @returns {string[]}
 */
getTargetPaths = function () {
    var appendPaths = undefined,
        paths = undefined;

    appendPaths = [];

    if (_yargs.argv._.length) {
        paths = _yargs.argv._;
    } else {
        paths = ['./'];
    }

    paths = _lodash2.default.filter(paths, function (pathName) {
        var exclude = undefined;

        exclude = _lodash2.default.endsWith(pathName, '/') === true;

        if (exclude) {
            appendPaths.push(pathName + '**/*.js');
            appendPaths.push(pathName + '**/*.css');
            appendPaths.push(pathName + '**/*.scss');
        }

        return !exclude;
    });

    paths = paths.concat(appendPaths);
    paths = _lodash2.default.unique(paths);

    paths = _globby2.default.sync(paths);
    // @todo Test whether glob.sync can return non-unique file paths.
    // paths = _.unique(paths);

    // console.log('paths', paths);

    paths = _lodash2.default.map(paths, resolveAbsolutePath);

    // console.log('paths', paths);

    return paths;
};

/**
 * @param {Object} report
 * @returns {undefined}
 */
outputReport = function (report) {
    var formatter = undefined,
        output = undefined;

    if (_yargs.argv.outputFormat === 'json') {
        output = JSON.stringify({
            messages: report.messages,
            errorCount: report.errorCount,
            warningCount: report.warningCount
        }, '', 4);
    } else {
        formatter = (0, _2.getFormatter)();

        if (_yargs.argv.stdin) {
            output = formatter({
                results: [report],
                errorCount: report.errorCount,
                warningCount: report.warningCount
            });
        } else {
            output = formatter(report);
        }
    }

    /* eslint-disable no-console */
    console.log(output);
    /* eslint-enable no-console */
};

if (_yargs.argv.stdin) {
    _yargs2.default.options({
        linter: {
            demand: true,
            describe: 'The type of input.',
            choices: ['js', 'scss']
        }
    }).argv;

    (0, _getStdin2.default)().then(function (stdin) {
        var report = undefined;

        report = (0, _2.lintText)(stdin, {
            linter: _yargs.argv.linter
        });

        // console.log('BEST', stdin, argv.linter, lintText);

        outputReport(report);
    });
} else {
    var report = undefined;

    targetPaths = getTargetPaths();

    // console.log('targetPaths', targetPaths);

    report = (0, _2.lintFiles)(targetPaths);

    outputReport(report);
}
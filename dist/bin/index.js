'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _2 = require('./../');

var _yargs = require('yargs');

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var formatter = undefined,
    resolveAbsolutePath = undefined,
    getTargetPaths = undefined,
    targetPaths = undefined,
    report = undefined;

formatter = (0, _2.getFormatter)();

/**
 * @param {String} relativePath Path relative to the process.cwd()
 * @return {String} Absolute path.
 */
resolveAbsolutePath = function (relativePath) {
    return _path2['default'].resolve(process.cwd(), relativePath);
};

/**
 * @return {String[]}
 */
getTargetPaths = function () {
    var paths = undefined,
        appendPaths = [];

    if (_yargs.argv._.length) {
        paths = _yargs.argv._;
    } else {
        paths = ['./'];
    }

    paths = _lodash2['default'].filter(paths, function (pathName) {
        var exclude = undefined;

        exclude = _lodash2['default'].endsWith(pathName, '/') === true;

        if (exclude) {
            appendPaths.push(pathName + '**/*.js');
            appendPaths.push(pathName + '**/*.css');
            appendPaths.push(pathName + '**/*.scss');
        }

        return !exclude;
    });

    paths = paths.concat(appendPaths);
    paths = _lodash2['default'].unique(paths);

    paths = _globby2['default'].sync(paths);
    // @todo Test whether glob.sync can return non-unique file paths.
    // paths = _.unique(paths);

    // console.log('paths', paths);

    paths = _lodash2['default'].map(paths, resolveAbsolutePath);

    // console.log('paths', paths);

    return paths;
};

targetPaths = getTargetPaths();

// console.log('targetPaths', targetPaths);

report = (0, _2.lintFiles)(targetPaths);

// console.log('report', report.results[0]);

console.log(formatter(report));
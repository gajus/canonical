<h1 id="canonical">Canonical</h1>

<!-- [![Travis build status](http://img.shields.io/travis/gajus/canonical/master.svg?style=flat-square)](https://travis-ci.org/gajus/canonical) -->
[![NPM version](http://img.shields.io/npm/v/canonical.svg?style=flat-square)](https://www.npmjs.com/package/canonical)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

* [Canonical](#canonical)
    * [Badge](#canonical-badge)
    * [Rules](#canonical-rules)
    * [Usage](#canonical-usage)
        * [Command Line](#canonical-usage-command-line)
        * [Gulp](#canonical-usage-gulp)
        * [Node.js API](#canonical-usage-node-js-api)


Canonical code style linter and formatter for JavaScript, SCSS and CSS.

<h2 id="canonical-badge">Badge</h2>

Use this in one of your projects? Include one of these badges in your README to let people know that your code is using the Canonical style.

[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

```
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
```


<h2 id="canonical-rules">Rules</h2>

Canonical rules are composed of the following packages:

* [`eslint-config-canonical`](https://github.com/gajus/eslint-config-canonical)
* [`eslint-config-canonical`](https://github.com/gajus/eslint-config-canonical-jsdoc)
* [`eslint-config-canonical`](https://github.com/gajus/eslint-config-canonical-lodash)
* [`eslint-config-canonical`](https://github.com/gajus/eslint-config-canonical-react)

<h2 id="canonical-usage">Usage</h2>

<h3 id="canonical-usage-command-line">Command Line</h3>

The easiest way to use Canonical to check your code style is to install it as a Node command line program.

```sh
npm install canonical -g
```

After that, you can run `canonical` program on any JavaScript, SCSS or CSS file:

```sh
# Lint all JavaScript in ./src/ directory.
canonical ./src/**/*.js

# Lint all CSS in ./src/ directory.
canonical ./src/**/*.css

# Lint all JavaScript and CSS in ./src/ directory.
canonical ./src/**/*.js ./src/**/*.css

# List all supported formats in ./src/ and the descending directories.
canonical ./src/
```

<h4 id="canonical-usage-command-line-reading-from-stdin">Reading from Stdin</h4>

`canonical` program can read from stdin, e.g.

```
echo 'var test;' | canonical --stdin --linter js --output-format json
```

When reading from stdin, it is required to provide `--linter` option. See [Command Line Options](#command-line-options).

<h4 id="canonical-usage-command-line-command-line-options">Command Line Options</h4>

```
Options:
  --help           Show help                                           [boolean]
  --stdin          Used to indicate that subject body will be read from stdin.
                                                      [boolean] [default: false]
  --file-path      Name of the file being linted with stdin (if any). Used in
                   reporting.                       [string] [default: "<text>"]
  --linter         The type of input.         [required] [choices: "js", "scss"]
  --output-format    [choices: "json", "checkstyle", "table"] [default: "table"]
```

<h3 id="canonical-usage-gulp">Gulp</h3>

Using [Canonical](https://github.com/gajus/canonical) does not require a [Gulp](http://gulpjs.com/) plugin. Canonical [program interface](https://github.com/gajus/canonical#program-interface) gives access to all features.

Use Canonical API in combination with a glob pattern matcher (e.g. [globby](https://www.npmjs.com/package/globby)) to lint multiple files, e.g.

```js
import gulp from 'gulp';
import globby from 'globby';

import {
    lintText,
    lintFiles,
    getFormatter
} from 'canonical/es';

gulp.task('lint-javascript', () => {
    return globby(['./**/*.js'])
        .then((paths) => {
            let formatter,
                report;

            formatter = getFormatter();
            report = lintFiles(paths);

            if (report.errorCount || report.warningCount) {
                console.log(formatter(report.results));
            }
        });
});
```

This example is written using ES6 syntax. If you want your `gulpfile.js` to use ES6 syntax, you have to execute it using [Babel](babeljs.io) or an equivalent code-to-code compiler, e.g.

```sh
babel-node ./node_modules/.bin/gulp lint-javascript
```

<h3 id="canonical-usage-node-js-api">Node.js API</h3>

```js
import {
    getFormatter,
    lintText,
    lintFile
} from 'canonical';

/**
 * @returns {function}
 */
getFormatter;

/**
 * @typedef lintText~message
 * @property {string} ruleId
 * @property {number} severity
 * @property {string} message
 * @property {number} line
 * @property {number} column
 * @property {string} nodeType
 * @property {string} source
 */

/**
 * @typedef lintText~result
 * @property {string} filePath
 * @property {lintFiles~message[]} messages
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @typedef lintText~options
 * @property {string} language (supported languages: 'js', 'scss').
 */

/**
 * @param {string} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
lintText;

/**
 * @typedef lintFiles~report
 * @property {lintText~result[]} results
 * @property {number} errorCount
 * @property {number} warningCount
 */

/**
 * @param {string[]} filePaths
 * @return {lintFiles~report}
 */
lintFiles;
```


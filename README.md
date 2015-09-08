# Canonical

## Badge

Use this in one of your projects? Include one of these badges in your README to let people know that your code is using the Canonical style.

[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

```
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)
```

## Usage

### Command Line

The easiest way to use Canonical to check your code style is to install it as a Node command line program.

```sh
npm install canonical -g
```

After that, you can run Canonical on any JavaScript file:

```sh
canonical ./test.js
```

### Node.js API

```js
import {
    getFormatter,
    lintFiles
} from 'canonical';

/**
 * @return {Function}
 */
getFormatter;

/**
 * @typedef lintFiles~message
 * @property {String} ruleId
 * @property {Number} severity
 * @property {String} message
 * @property {Number} line
 * @property {Number} column
 * @property {String} nodeType
 * @property {String} source
 */

/**
 * @typedef lintFiles~result
 * @property {String} filePath
 * @property {lintFiles~message[]} messages
 * @property {Number} errorCount
 * @property {Number} warningCount
 */

/**
 * @typedef lintFiles~report
 * @property {Number} errorCount
 * @property {Number} warningCount
 * @property {lintFiles~result[]} results
 */

/**
 * @param {String[]} filePaths
 * @return {lintFiles~report}
 */
lintFiles;
```

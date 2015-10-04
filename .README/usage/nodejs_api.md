### Node.js API

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

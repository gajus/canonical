### Node.js API

```js
import {
    fixFiles,
    fixText,
    getFormatter,
    lintFiles,
    lintText
} from 'canonical';

/**
 * @returns {function}
 */
getFormatter;

/**
 * @typedef fixFiles~report
 * @property {fixText~result[]} results
 */

/**
 * @param {string[]} filePaths
 * @return {fixFiles~report}
 */

fixFiles;

/**
 * @typedef fixText~result
 * @property {string} filePath
 * @property {string} output
 */

/**
 * @typedef fixText~options
 * @property {string} syntax (supported languages: 'css', 'js', 'json', 'scss').
 */

/**
 * @param {string} text
 * @param {fixText~options} options
 * @return {fixText~result}
 */
fixText;

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
 * @property {string} syntax (supported languages: 'css', 'js', 'json', 'scss').
 */

/**
 * @param {string} text
 * @param {lintText~options} options
 * @return {lintText~result}
 */
lintText;
```

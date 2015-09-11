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

After that, you can run Canonical on any JavaScript or CSS file:

```sh
# Lint all JavaScript in ./src/ directory.
canonical ./src/**/*.js

# Lint all CSS in ./src/ directory.
canonical ./src/**/*.css

# Lint all JavaScript and CSS in ./src/ directory.
canonical ./src/**/*.js ./src/**/*.css
```

### Node.js API

```js

```

### Gulp

Using [Canonical](https://github.com/gajus/canonical) does not require a [Gulp](http://gulpjs.com/) plugin. Canonical [program interface](https://github.com/gajus/canonical#program-interface) gives access to all features. Use Canonical API in combination with a glob pattern matcher (e.g. [globby](https://www.npmjs.com/package/globby)) to lint multiple files, e.g.

```js
import gulp from 'gulp';
import glob from 'globby';

import {
    lintText,
    lintFiles,
    getFormatter
} from 'canonical/es';

gulp.task('lint-javascript', () => {
    return glob(['./**/*.js'])
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

This example is written using ES6 syntax. If you want your `gulpfile.js` to use ES6 syntax, you have to execute it using [Babel](babeljs.io) or an equivalent code-to-code compiler (ES6 to ES6), e.g.

```sh
babel-node ./node_modules/.bin/gulp lint-javascript
```

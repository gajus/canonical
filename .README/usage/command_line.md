### Command Line

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

#### Reading from Stdin

`canonical` program can read from stdin, e.g.

```
echo 'var test;' | canonical --stdin --linter js --output-format json
```

When reading from stdin, it is required to provide `--linter` option. See [Command Line Options](#command-line-options).

#### Command Line Options

```
Options:
  --help           Show help                                           [boolean]
  --file-path      Name of the file being linted with stdin (if any). Used in
                   reporting.                       [string] [default: "<text>"]
  --fix            Used to automatically fix linting issues when possible. Works
                   only when linting target is a file (does not work with stdin
                   input).                            [boolean] [default: false]
  --linter         The type of input.                    [choices: "js", "scss"]
  --stdin          Used to indicate that subject body will be read from stdin.
                                                      [boolean] [default: false]
  --output-format    [choices: "json", "checkstyle", "table"] [default: "table"]
```

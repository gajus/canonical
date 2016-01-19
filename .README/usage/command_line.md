### Command Line

The easiest way to use Canonical to check your code style is to install it as a Node command line program.

```sh
npm install canonical -g
```

After that, you can run `canonical` program on any JavaScript, SCSS or CSS file.

#### Linting

```sh
# Lint all JavaScript in ./src/ directory.
canonical lint ./src/**/*.js

# Lint all CSS in ./src/ directory.
canonical lint ./src/**/*.css

# Lint all JavaScript and CSS in ./src/ directory.
canonical lint ./src/**/*.js ./src/**/*.css

# List all supported formats in ./src/ and the descending directories.
canonical lint ./src/
```

#### Fixing

```sh
# Fix all JavaScript in ./src/ directory.
canonical fix ./src/**/*.js

# Fix all CSS in ./src/ directory.
canonical fix ./src/**/*.css

# Fix all JavaScript and CSS in ./src/ directory.
canonical fix ./src/**/*.js ./src/**/*.css

# Fix all supported formats in ./src/ and the descending directories.
canonical fix ./src/
```

#### Reading from `stdin`

`canonical` program can read from stdin, e.g.

```
echo 'var test;' | canonical lint --stdin --syntax js --output-format json
```

When reading from `stdin`, it is required to provide `--syntax` option. See [Command Line Options](#command-line-options).

#### Command Line Options

```
> canonical --help

Commands:
  fix   Fix code format.
  lint  Report code format errors.

Options:
  --help  Show help                                                    [boolean]
```

```
canonical fix --help

Options:
  --help    Show help                                                  [boolean]
  --stdin   Used to indicate that subject body will be read from stdin.
                                                      [boolean] [default: false]
  --syntax  Syntax of the input.                  [choices: "js", "css", "scss"]
```

```
canonical lint --help

Options:
  --help           Show help                                           [boolean]
  --file-path      Name of the file being linted with stdin (if any). Used in
                   reporting.                       [string] [default: "<text>"]
  --stdin          Used to indicate that subject body will be read from stdin.
                                                      [boolean] [default: false]
  --syntax         Syntax of the input.           [choices: "js", "css", "scss"]
  --output-format    [choices: "json", "checkstyle", "table"] [default: "table"]
```

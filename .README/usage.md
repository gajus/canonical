## Usage

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

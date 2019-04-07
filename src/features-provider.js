const {uniq} = require('./utils/generic');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const {Successes, Failures} = require('./successes-failures');

const defaultIgnoreFileName = '.gherkin-lintignore';
const defaultIgnoredFiles = 'node_modules/**'; // Ignore node_modules by default
const invalidFormatMessage = (pattern) =>
  `Invalid format of the feature file path/pattern: "${pattern}".\n`;
const USE_EXISTING_FEATURE =
  'To run the linter please specify an existing feature file, directory or glob.';

const getFixedPattern = (pattern) => {
  if (pattern == '.') {
    return '**/*.feature';
  } else if (pattern.match(/.*\/\*\*/)) {
    return `${pattern.slice(0, -1)}.feature`;
  } else if (pattern.match(/.*\.feature/)) {
    return pattern;
  } else {
    try {
      if (fs.statSync(pattern).isDirectory()) {
        return path.join(pattern, '**/*.feature');
      }
    } catch (e) {
      /* Don't show the fs callstack,
       * we will print a custom error message bellow instead
       */
    }
  }
};

const parseFile = (fileName) => {
  const content = fs.readFileSync(fileName, 'utf-8');
  return {
    content,
    name: fileName,
    lines: content.split(/\r\n|\r|\n/),
    path: fs.realpathSync(fileName),
  };
};

const getIgnorePatterns = (ignoreArg) => {
  if (ignoreArg) {
    return ignoreArg;
  } else if (fs.existsSync(defaultIgnoreFileName)) {
    return fs.readFileSync(defaultIgnoreFileName)
      .toString()
      .split(/\r\n|\r|\n/)
      .filter((str) => str !== '');
  } else {
    return defaultIgnoredFiles;
  }
};

class FeatureFinder {
  constructor(args, ignoreArg) {
    this.args = args;
    this.ignoreArg = ignoreArg;
  }

  provide() {
    const {args, ignoreArg} = this;
    const patterns = args.length ? args : ['.'];

    const result = patterns.reduce(function(result, pattern) {
      // First we need to fix up the pattern so that it only matches .feature files
      // and it's in the format that glob expects it to be
      const fixedPattern = getFixedPattern(pattern);
      if (!fixedPattern) {
        return result.chain(() => Failures.of([{
          type: 'feature-pattern-error',
          message: `${invalidFormatMessage(pattern)}${USE_EXISTING_FEATURE}`,
        }]));
      }

      const globOptions = {ignore: getIgnorePatterns(ignoreArg)};
      const fileNames = glob.sync(fixedPattern, globOptions);
      return result.chain(() => {
        return result.append(Successes.of(fileNames));
      });
    }, Successes.of([]));
    return result.chain((files) => Successes.of(uniq(files).map(parseFile)));
  }
}

module.exports = FeatureFinder;

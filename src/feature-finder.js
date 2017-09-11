var _ = require('lodash');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var defaultIgnoreFileName = '.gherkin-lintignore';
var defaultIgnoredFiles = 'node_modules/**'; // Ignore node_modules by default

function getFeatureFiles(args, ignoreArg) {
  var files = [];
  var patterns = args.length ? args : ['.'];

  patterns.forEach(function(pattern) {
    // First we need to fix up the pattern so that it only matches .feature files
    // and it's in the format that glob expects it to be
    var fixedPattern;
    if (pattern == '.') {
      fixedPattern = '**/*.feature';
    } else if (pattern.match(/.*\/\*\*/)) {
      fixedPattern = pattern.slice(0, -1) + '.feature';
    } else if (pattern.match(/.*\.feature/)) {
      fixedPattern = pattern;
    } else {
      try {
        if(fs.statSync(pattern).isDirectory()) {
          fixedPattern = path.join(pattern, '**/*.feature');
        }
      } catch(e) {
        // Don't show the fs callstack, we will print a custom error message bellow instead
      }
    }

    if (!fixedPattern) {
      throw new Error(`Invalid format of the feature file path/pattern: "${pattern}".\nTo run the linter please specify an existing feature file, directory or glob.`);
    }

    var globOptions = {ignore: getIgnorePatterns(ignoreArg)};
    files = files.concat(glob.sync(fixedPattern, globOptions));
  });
  return _.uniq(files);
}

function getIgnorePatterns(ignoreArg) {
  if (ignoreArg) {
    return ignoreArg;
  } else if (fs.existsSync(defaultIgnoreFileName)) {
    // return an array where each element of the array is a line of the ignore file
    return fs.readFileSync(defaultIgnoreFileName)
              .toString()
              .split(/[\n|\r]/)
              .filter(function(i) {
              // remove empty strings
                if (i !== '') {
                  return true;
                }
                return false;
              });
  } else {
    return defaultIgnoredFiles;
  }
}

module.exports = {
  getFeatureFiles: getFeatureFiles,
  defaultIgnoreFileName: defaultIgnoreFileName
};

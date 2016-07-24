var glob = require('glob');
var fs = require('fs');

var defaultIgnoreFileName = '.gherkin-lintignore';
var defaultIgnoredFiles = 'node_modules/**'; // Ignore node_modules by default

function getFeatureFiles(args, ignoreArg) {
  var files = [];
  args.forEach(function(arg) {
    var pattern = '';
    if (arg == '.') {
      pattern = '**/*.feature';
    } else if (arg.match(/.*\/\*\*/)) {
      pattern = arg.slice(0, -1) + '.feature';
    } else if(arg.match(/\/$/)) {
      pattern = arg + '**/*.feature';
    } else if (arg.match(/.*\.feature/)) {
      pattern = arg;
    } else {
      throw new Error('Invalid input format. To run the linter please specify a feature file, directory or glob.');
    }

    var globOptions = {ignore: getIgnorePatterns(ignoreArg)};
    files = files.concat(glob.sync(pattern, globOptions));
  });
  return files;
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

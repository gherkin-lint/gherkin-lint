var rule = 'no-dupe-feature-names';
var features = [];

function noDuplicateFeatureNames(parsedFile, file) {
  if (parsedFile.name) {
    if (parsedFile.name in features) {
      var dupes = features[parsedFile.name].files.join(', ');
      features[parsedFile.name].files.push(file.name);
      return {message: 'Feature name is already used in: ' + dupes,
              rule   : rule,
              line   : parsedFile.location.line};
    } else {
      features[parsedFile.name] = {files: [file.name]};
    }
  }
}

module.exports = {
  name: rule,
  run: noDuplicateFeatureNames
};

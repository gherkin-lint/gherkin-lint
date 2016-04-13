var rule = "no-dupe-feature-names";
var features = [];

function noDuplicateFeatureNames(parsedFile, fileName) {
  if (parsedFile.name) {
    if (parsedFile.name in features) {
      features[parsedFile.name].files.push(fileName);
      var filesWithSameFeatureName = features[parsedFile.name].files;
      return {message: "Feature name is already used in: " + filesWithSameFeatureName,
              rule   : rule,
              line   : parsedFile.location.line};
    } else {
      features[parsedFile.name] = {files: [fileName]};
    }
  }
}

module.exports = {
  name: rule,
  run: noDuplicateFeatureNames
};

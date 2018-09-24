var rule = 'no-dupe-feature-names';
var features = [];

function noDuplicateFeatureNames(feature, file) {
  if (feature.name) {
    if (feature.name in features) {
      var dupes = features[feature.name].files.join(', ');
      features[feature.name].files.push(file.name);
      return {message: 'Feature name is already used in: ' + dupes,
        rule   : rule,
        line   : feature.location.line};
    } else {
      features[feature.name] = {files: [file.name]};
    }
  }
}

module.exports = {
  name: rule,
  run: noDuplicateFeatureNames
};

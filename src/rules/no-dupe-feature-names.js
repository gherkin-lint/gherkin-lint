var rule = 'no-dupe-feature-names';
var features = [];

function noDuplicateFeatureNames(feature, file) {
  var errors = [];
  if (feature && feature.name) {
    if (feature.name in features) {
      var dupes = features[feature.name].files.join(', ');
      features[feature.name].files.push(file.name);
      errors.push({
        message: 'Feature name is already used in: ' + dupes,
        rule   : rule,
        line   : feature.location.line
      });
    } else {
      features[feature.name] = {files: [file.name]};
    }
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noDuplicateFeatureNames,
  reset: () => features = []
};

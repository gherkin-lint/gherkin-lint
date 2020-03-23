var rule = 'no-dupe-feature-names';
var features = [];

function noDuplicateFeatureNames(feature, fileName) {
  if (!feature) {
    return [];
  }
  var errors = [];
  if (feature.name in features) {
    var dupes = features[feature.name].files.join(', ');
    features[feature.name].files.push(fileName);
    errors.push({
      message: 'Feature name is already used in: ' + dupes,
      rule   : rule,
      line   : feature.location.line
    });
  } else {
    features[feature.name] = {files: [fileName]};
  }
  
  return errors;
}

module.exports = {
  name: rule,
  run: noDuplicateFeatureNames
};

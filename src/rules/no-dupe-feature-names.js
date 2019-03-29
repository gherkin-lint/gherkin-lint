const rule = 'no-dupe-feature-names';

function noDuplicateFeatureNames(feature, file) {
  const {features} = this.options;
  if (feature.name) {
    if (feature.name in features) {
      const dupes = features[feature.name].files.join(', ');
      features[feature.name].files.push(file.name);
      return [{
        message: `Feature name is already used in: ${dupes}`,
        rule,
        line: feature.location.line,
      }];
    } else {
      features[feature.name] = {files: [file.name]};
    }
  }
  return [];
}

module.exports = {
  init: () => ({
    features: {},
  }),
  name: rule,
  run: noDuplicateFeatureNames,
  isValidConfig: () => true,
};

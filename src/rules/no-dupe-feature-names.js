const rule = 'no-dupe-feature-names';
const features = [];

function run(feature, file) {
  if (!feature) {
    return [];
  }
  let errors = [];
  if (feature.name in features) {
    const dupes = features[feature.name].files.join(', ');
    features[feature.name].files.push(file.relativePath);
    errors.push({
      message: 'Feature name is already used in: ' + dupes,
      rule   : rule,
      line   : feature.location.line,
      column : feature.location.column,
    });
  } else {
    features[feature.name] = {files: [file.relativePath]};
  }

  return errors;
}

module.exports = {
  name: rule,
  run: run
};

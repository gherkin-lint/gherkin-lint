const path = require('path');
const rule = 'no-dupe-file-names';
const features = [];

function run(feature, file) {
  if (!file) {
    return [];
  }
  let errors = [];
  const filename = path.basename(file.relativePath, '.feature');
  if (filename in features) {
    const dupes = features[filename].files.join(', ');
    features[filename].files.push(file.relativePath);
    errors.push({
      message: 'File name is already used in: ' + dupes,
      rule   : rule,
      line: 0
    });
  } else {
    features[filename] = {files: [file.relativePath]};
  }

  return errors;
}

module.exports = {
  name: rule,
  run: run
};

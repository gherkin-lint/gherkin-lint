const path = require('path');
const _ = require('lodash');

const rule = 'file-name';
const availableConfigs = {
  'style': 'PascalCase'
};
const checkers = {
  'PascalCase': filename => _.startCase(filename).replace(' ', ''),
  'Title Case': filename => _.startCase(filename),
  'camelCase': filename => _.camelCase(filename),
  'kebab-case': filename => _.kebabCase(filename),
  'snake_case': filename => _.snakeCase(filename)
};

function run(feature, file, configuration) {
  if (!file) {
    return [];
  }
  const {style} = _.merge(availableConfigs, configuration);
  const filename = path.basename(file.relativePath, '.feature');
  if (!checkers[style]) {
    throw new Error('style "' + style + '" not supported for file-name rule');
  }
  const expected = checkers[style](filename);
  if (filename === expected) {
    return [];
  }
  return [{
    message: `File names should be written in ${style} e.g. "${expected}.feature"`,
    rule: rule,
    line: 0
  }];
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

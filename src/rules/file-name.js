const path = require('path');
const _ = require('lodash');

const rule = 'file-name';
const availableConfigs = {
  'style': 'TitleCase'
};
const checkers = {
  TitleCase(filename) {
    return _.startCase(filename).replace(' ', '');
  },
  camelCase(filename) {
    return _.camelCase(filename);
  },
  ['kebab-case'](filename) {
    return _.kebabCase(filename);
  },
  ['snake_case'](filename) {
    return _.snakeCase(filename);
  }
};

function report(style, expected) {
  return [{
    message: `File names should be written in ${style} e.g. "${expected}.feature"`,
    rule: rule,
    line: 0
  }];
}

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
  return report(style, expected);
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

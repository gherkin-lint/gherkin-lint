const path = require('path');
const _ = require('lodash');

const rule = 'file-name';
const availableConfigs = {
  'style': 'TitleCase'
};
const checkers = {
  TitleCase(filename) {
    const expected = _.startCase(filename).replace(' ', '');
    if (filename === expected) {
      return [];
    }
    return report('TitleCase', expected);
  },
  camelCase(filename) {
    const expected = _.camelCase(filename);
    if (filename === expected) {
      return [];
    }
    return report('camelCase', expected);
  },
  ['kebab-case'](filename) {
    const expected = _.kebabCase(filename);
    if (filename === expected) {
      return [];
    }
    return report('kebab-case', expected);
  },
  ['snake_case'](filename) {
    const expected = _.snakeCase(filename);
    if (filename === expected) {
      return [];
    }
    return report('snake_case', expected);
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
  return checkers[style](filename);
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

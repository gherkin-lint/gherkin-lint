const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'no-superfluous-tags';

function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  feature.children.forEach(function(child) {
    const node = child.background || child.scenario;
    checkTags(node, feature, feature.language, errors);

    if (node.examples) {
      node.examples.forEach(function(example) {
        checkTags(example, feature, feature.language, errors);
        checkTags(example, node, feature.language, errors);
      });
    }
  });
  return errors;
}

function checkTags(child, parent, language, errors) {
  const superfluousTags = _.intersectionBy(child.tags, parent.tags, 'name');
  const childType = gherkinUtils.getNodeType(child, language);
  const parentType = gherkinUtils.getNodeType(parent, language);

  superfluousTags.forEach(function(tag) {
    errors.push({
      message: `Tag duplication between ${childType} and its corresponding ${parentType}: ${tag.name}`,
      rule   : rule,
      line   : tag.location.line
    });
  });
}

module.exports = {
  name: rule,
  run: run
};

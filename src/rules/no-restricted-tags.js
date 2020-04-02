const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'no-restricted-tags';
const availableConfigs = {
  'tags': []
};


function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }
  
  const forbiddenTags = configuration.tags;
  const language = feature.language;
  let errors = [];

  checkTags(feature, language, forbiddenTags, errors);
  if (feature.children) {
    feature.children.forEach(function(child) {
      // backgrounds don't have tags
      if (child.scenario) {
        checkTags(child.scenario, language, forbiddenTags, errors);

        child.scenario.examples.forEach(function(example) {
          checkTags(example, language, forbiddenTags, errors);
        });
      }      
    });
  }
  return errors;
}


function checkTags(node, language, forbiddenTags, errors) {
  const nodeTags = node.tags || [];
  const nodeType = gherkinUtils.getNodeType(node, language);
  nodeTags.forEach(function(tag) {
    if (_.includes(forbiddenTags, tag.name)) {
      errors.push({
        message: `Forbidden tag ${tag.name} on ${nodeType}`,
        rule   : rule,
        line   : tag.location.line
      });
    }
  });
}


module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

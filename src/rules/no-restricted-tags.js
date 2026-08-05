const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'no-restricted-tags';
const availableConfigs = {
  'tags': [],
  'patterns': []
};


function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }
  
  const forbiddenTags = configuration.tags;
  const forbiddenPatterns = getForbiddenPatterns(configuration);
  const language = feature.language;
  let errors = [];

  gherkinUtils.getTaggableNodes(feature).forEach(node => {
    checkTags(node, language, forbiddenTags, forbiddenPatterns, errors);
  });
  
  return errors;
}


function getForbiddenPatterns(configuration) {
  return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}


function checkTags(node, language, forbiddenTags, forbiddenPatterns, errors) {
  const nodeType = gherkinUtils.getNodeType(node, language);
  node.tags.forEach(tag => {
    if (isForbidden(tag, forbiddenTags, forbiddenPatterns)) {
      errors.push({
        message: `Forbidden tag ${tag.name} on ${nodeType}`,
        rule   : rule,
        line   : tag.location.line
      });
    }
  });
}


function isForbidden(tag, forbiddenTags, forbiddenPatterns) {
  return _.includes(forbiddenTags, tag.name)
    || forbiddenPatterns.some((pattern) => pattern.test(tag.name));
}


module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

const _ = require('lodash');
const rule = 'allowed-tags';

const availableConfigs = {
  'tags': [],
  'patterns': []
};

function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  const allowedTags = configuration.tags;
  const allowedPatterns = getAllowedPatterns(configuration);

  checkTags(feature, allowedTags, allowedPatterns, errors);

  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, allowedTags, allowedPatterns, errors);

      if (child.scenario.examples) {
        child.scenario.examples.forEach(example => {
          checkTags(example, allowedTags, allowedPatterns, errors);
        });
      }
    }
  });

  return errors;
}

function getAllowedPatterns(configuration) {
  return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}

function checkTags(node, allowedTags, allowedPatterns, errors) {
  return (node.tags || [])
    .filter(tag => !isAllowed(tag, allowedTags, allowedPatterns))
    .forEach(tag => {
      errors.push(createError(node, tag));
    });
}

function isAllowed(tag, allowedTags, allowedPatterns) {
  return _.includes(allowedTags, tag.name)
    || allowedPatterns.some((pattern) => pattern.test(tag.name));
}

function createError(node, tag) {
  return {
    message: 'Not allowed tag ' + tag.name + ' on ' + node.keyword,
    rule   : rule,
    line   : tag.location.line,
    column : tag.location.column,
  };
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

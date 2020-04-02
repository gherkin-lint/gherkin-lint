const _ = require('lodash');

const rule = 'no-duplicate-tags';

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];

  verifyTags(feature, errors);
  if (feature.children !== undefined) {
    feature.children.forEach(function(child) {
      if (child.background) {
        verifyTags(child.background, errors);
      } else {
        verifyTags(child.scenario, errors);
        child.scenario.examples.forEach(function(example) {
          verifyTags(example, errors);
        });
      }
    });
  }
  return errors;
}

function verifyTags(node, errors) {
  const failedTagNames = [];
  const uniqueTagNames = [];
  (node.tags || []).forEach(function(tag) {
    if (!_.includes(failedTagNames, tag.name)) {
      if (_.includes(uniqueTagNames, tag.name)) {
        errors.push({message: 'Duplicate tags are not allowed: ' + tag.name,
          rule   : rule,
          line   : tag.location.line});
        failedTagNames.push(tag.name);
      } else  {
        uniqueTagNames.push(tag.name);
      }
    }
  });
}

module.exports = {
  name: rule,
  run: run
};

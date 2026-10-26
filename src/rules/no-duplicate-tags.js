const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'no-duplicate-tags';

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];

  gherkinUtils.getTaggableNodes(feature).forEach(node => {
    verifyTags(node, errors);
  });
  return errors;
}

function verifyTags(node, errors) {
  const failedTagNames = [];
  const uniqueTagNames = [];
  node.tags.forEach(tag => {
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

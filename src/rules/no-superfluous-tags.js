var _ = require('lodash');

var rule = 'no-superfluous-tags';

function noSuperfluousTags(feature) {
  var errors = [];
  if (feature.children) {
    feature.children.forEach(function(child) {
      checkTags(child, feature, errors);

      if (child.examples) {
        child.examples.forEach(function(example) {
          checkTags(example, feature, errors);
          checkTags(example, child, errors);
        });
      }
    });
  }
  return errors;
}

function checkTags(child, parent, errors) {
  let superfluousTags = _.intersectionBy(child.tags, parent.tags, 'name');

  superfluousTags.forEach(function(tag) {
    errors.push({
      message: `Tag duplication between ${child.type} and its corresponding ${parent.type}: ${tag.name}`,
      rule   : rule,
      line   : tag.location.line
    });
  });
}

module.exports = {
  name: rule,
  run: noSuperfluousTags
};

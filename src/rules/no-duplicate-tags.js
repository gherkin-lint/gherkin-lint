var _ = require('lodash');

var rule = 'no-duplicate-tags';

function noDuplicateTags(feature) {
  var errors = [];
  errors = errors.concat(verifyTags(feature.tags, feature.location));
  if(feature.children !== undefined) {
    _.forEach(feature.children, function(child) {
      errors = errors.concat(verifyTags(child.tags, child.location));
    });
  }
  return errors;
}

function verifyTags(tags, location) {
  var errors = [],
    failedTagNames = [],
    uniqueTagNames = [];
  if (tags !== undefined && location !== undefined) {
    _.forEach(tags, function(tag) {
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
  return errors;
}

module.exports = {
  name: rule,
  run: noDuplicateTags
};

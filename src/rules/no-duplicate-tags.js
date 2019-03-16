const _ = require('lodash');

const rule = 'no-duplicate-tags';

function noDuplicateTags(feature) {
  let errors = [];
  errors = errors.concat(verifyTags(feature.tags, feature.location));
  if (feature.children !== undefined) {
    feature.children.forEach(function(child) {
      errors = errors.concat(verifyTags(child.tags, child.location));
    });
  }
  return errors;
}

function verifyTags(tags, location) {
  const errors = [];
  const failedTagNames = [];
  const uniqueTagNames = [];
  if (tags !== undefined && location !== undefined) {
    tags.forEach(function(tag) {
      if (!_.includes(failedTagNames, tag.name)) {
        if (_.includes(uniqueTagNames, tag.name)) {
          errors.push({
            message: `Duplicate tags are not allowed: ${ tag.name}`,
            rule: rule,
            line: tag.location.line,
          });
          failedTagNames.push(tag.name);
        } else {
          uniqueTagNames.push(tag.name);
        }
      }
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noDuplicateTags,
  isValidConfig: _.stubTrue,
};

var _ = require('lodash');

var rule = 'no-superfluous-tags';

function noSuperfluousTags(feature) {
  var errors = [];
  if (feature.children) {
    feature.children.forEach(function(child) {

      checkTags(feature, child, errors);

      if (child.examples) {
        child.examples.forEach(function(example) {
          checkTags(feature, example, errors);
          checkTags(child, example, errors);
        });
      }
    });
  }
  return errors;
}

function checkTags(parent, child, errors) {
  var superfluousTags = _.intersectionWith(child.tags, parent.tags, function(lhs, rhs) {
    return lhs.name === rhs.name;
  });

  if (superfluousTags.length) {
    var superfluousTagNames = _.map(superfluousTags, function(tag) {
      return tag.name;
    });

    errors.push({
      message: `Tag(s) duplicated on ${parent.type} and ${child.type}: ` +
               _.join(superfluousTagNames, ', '),
      rule   : rule,
      line   : superfluousTags[0].location.line
    });
  }
}

module.exports = {
  name: rule,
  run: noSuperfluousTags
};

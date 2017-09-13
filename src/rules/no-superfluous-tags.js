var _ = require('lodash');

var rule = 'no-superfluous-tags';

function noSuperfluousTags(feature) {
  var errors = [];
  if(feature.tags !== undefined && feature.children !== undefined) {
    _.forEach(feature.children, function(child) {
      if (child.tags !== undefined) {
        var superfluousTags = _.intersectionWith(child.tags, feature.tags, function(lhs, rhs) {
          return lhs.name === rhs.name;
        });
        if (superfluousTags.length !== 0) {
          var superfluousTagNames = _.map(superfluousTags, function(tag) {
            return tag.name;
          });
          errors.push({message: 'Tag(s) duplicated on a Feature and a Scenario in that Feature: ' +
                                _.join(superfluousTagNames, ', '),
                       rule   : rule,
                       line   : superfluousTags[0].location.line});
        }
      }
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noSuperfluousTags
};

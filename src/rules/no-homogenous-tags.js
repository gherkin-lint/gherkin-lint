var _ = require('lodash');

var rule = 'no-homogenous-tags';

function noHomogenousTags(feature) {
  var errors = [];

  if (feature.children) {
    // Tags that exist in every scenario and scenario outline 
    // should be applied on a feature level
    var childrenTags = [];

    feature.children.forEach(function(child) {
      if (['Scenario', 'ScenarioOutline'].includes(child.type)) {

        childrenTags.push(getTagNames(child));

        if (child.examples) {
          var exampleTags = [];
          child.examples.forEach(function(example) {
            exampleTags.push(getTagNames(example));
          });

          var homogenousExampleTags = _.intersection(...exampleTags);
          if (homogenousExampleTags.length) {
            errors.push({
              message: 'All Examples of a Scenario Outline have the same tag(s), ' +
                'they should be defined on the Scenario Outline instead: ' + 
                homogenousExampleTags.join(', '),
              rule: rule,
              line: child.location.line
            });
          }
        }
      }
    });

    var homogenousTags = _.intersection(...childrenTags);
    if (homogenousTags.length) {
      errors.push({
        message: 'All Scenarios on this Feature have the same tag(s), ' +
          'they should be defined on the Feature instead: ' + 
          homogenousTags.join(', '),
        rule   : rule,
        line   : feature.location.line
      });
    }
  }
  return errors;
}

function getTagNames(node) {
  return _.map(node.tags, function(tag) {
    return tag.name;
  });
}

module.exports = {
  name: rule,
  run: noHomogenousTags
};

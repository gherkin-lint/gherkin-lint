const _ = require('lodash');

var rule = 'one-space-between-tags';

function run(feature) {
  if (!feature || Object.keys(feature).length === 0) {
    return [];
  }
  var errors = [];

  function testTags(allTags) {
    _(allTags).sort(function(tag) {
      return -tag.location.column;
    }).groupBy(function(tag) {
      return tag.location.line;
    }).forEach(function(tags) {
      const tags2 = tags.sort(function(a, b) {
        return a.location.column - b.location.column;
      });
      _.range(tags2.length - 1).map(function(i) {
        if ((tags2[i].location.column + tags2[i].name.length) < tags2[i + 1].location.column - 1) {
          errors.push({
            line: tags2[i].location.line,
            rule: rule,
            message: 'There is more than one space between the tags ' +
            tags2[i].name + ' and ' + tags2[i + 1].name
          });
        }
      });
    });
  }

  testTags(feature.tags);
  feature.children.forEach(function(child) {
    if (child.type === 'Scenario' || child.type === 'ScenarioOutline') {
      testTags(child.tags);
    }
  });

  return errors;
}

module.exports = {
  run: run,
  name: rule
};

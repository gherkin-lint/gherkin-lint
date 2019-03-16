const _ = require('lodash');

const rule = 'one-space-between-tags';

function run(feature) {
  if (!feature || Object.keys(feature).length === 0) {
    return [];
  }
  const errors = [];

  function testTags(allTags) {
    _(allTags).sort(function(tag) {
      return -tag.location.column;
    }).groupBy(function(tag) {
      return tag.location.line;
    }).forEach(function(tags) {
      const sortedTags = tags.sort(function(a, b) {
        return a.location.column - b.location.column;
      });
      _.range(sortedTags.length - 1).map(function(i) {
        const tag = sortedTags[i];
        const nextTag = sortedTags[i + 1];
        if ((tag.location.column + tag.name.length) < nextTag.location.column - 1) {
          errors.push({
            line: sortedTags[i].location.line,
            rule: rule,
            message: 'There is more than one space between the tags ' +
            tag.name + ' and ' + nextTag.name,
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
  name: rule,
  isValidConfig: _.stubTrue,
};

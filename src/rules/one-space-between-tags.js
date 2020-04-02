const _ = require('lodash');

const rule = 'one-space-between-tags';

function run(feature) {
  if (!feature) {
    return;
  }
  let errors = [];
  
  testTags(feature, errors);
  
  if (feature.children) {
    feature.children.forEach(function(child) {
      if (child.scenario) {
        testTags(child.scenario, errors);

        child.scenario.examples.forEach(function(example) {
          testTags(example, errors);
        });
      }
    });
  }
  return errors;
}

function testTags(node, errors) {
  _(node.tags)
    .groupBy('location.line')
    .sortBy('location.column')
    .forEach(function(tags) {
      _.range(tags.length - 1)
        .map(function(i) {
          if (tags[i].location.column + tags[i].name.length < tags[i + 1].location.column - 1) {
            errors.push({
              line: tags[i].location.line,
              rule: rule,
              message: 'There is more than one space between the tags ' +
                        tags[i].name + ' and ' + tags[i + 1].name
            });
          }
        });
    });
}

module.exports = {
  run: run,
  name: rule
};

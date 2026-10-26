const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'one-space-between-tags';

function run(feature) {
  if (!feature) {
    return;
  }
  let errors = [];
  
  gherkinUtils.getTaggableNodes(feature).forEach(node => {
    testTags(node, errors);
  });
  
  return errors;
}

function testTags(node, errors) {
  _(node.tags)
    .groupBy('location.line')
    .sortBy('location.column')
    .forEach(tags => {
      _.range(tags.length - 1)
        .map(i => {
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

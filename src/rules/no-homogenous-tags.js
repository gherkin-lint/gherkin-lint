const _ = require('lodash');

const rule = 'no-homogenous-tags';

function noHomogenousTags(feature) {
  let errors = [];
  if (feature.children !== undefined) {
    const tagNames = _.flatten(_.map(feature.children, function(child) {
      if ((child.type === 'Scenario' || child.type === 'ScenarioOutline') &&
          child.tags !== undefined) {
        return [_.map(child.tags, function(tag) {
          return tag.name;
        })];
      } else {
        return [];
      }
    }));

    const homogenousTags = _.intersection(...tagNames);
    if (homogenousTags.length !== 0) {
      // You could argue that the line number should be the first instance of a
      // bad tag, but I think this is really a problem with the whole feature.
      errors = [{message: `${'All Scenarios on this Feature have the same tag(s), ' +
                            'they should be defined on the Feature instead: '}${
        _.join(homogenousTags, ', ')}`,
      rule: rule,
      line: feature.location.line}];
    }
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noHomogenousTags,
  isValidConfig: _.stubTrue,
};

const rule = 'no-homogenous-tags';
const {
  append,
  compose,
  filter,
  intoArray,
  map,
  reduce,
} = require('../utils/main');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;
const uniq = (array) => [...new Set(array)];

const countTags = (tagStatistics, tagsNames) => {
  return tagsNames.reduce((tagStatistics, tagName) => {
    return tagStatistics.set(tagName, (tagStatistics.get(tagName) || 0) + 1);
  }, tagStatistics);
};

const noHomogenousTags = (feature) => {
  const scenarios = intoArray(filter(isScenario))(feature.children || []);
  const {length} = scenarios;
  const tagStatistics = reduce(compose(
    map(({tags}) => tags.map(({name}) => name)),
    map((tagNames) => uniq(tagNames))
  )(countTags), new Map())(scenarios);

  const homogenousTags = reduce(compose(
    filter(([tagName, times]) => times === length),
    map(([tagName]) => tagName)
  )(append), [])([...tagStatistics]);

  const homogenousTagsReport = homogenousTags.join(', ');
  return homogenousTagsReport ? [{
    message: 'All Scenarios on this Feature have the same tag(s), they' +
      ` should be defined on the Feature instead: ${homogenousTagsReport}`,
    rule: rule,
    line: feature.location.line,
  }] : [];
};

module.exports = {
  name: rule,
  run: noHomogenousTags,
  isValidConfig: () => true,
};

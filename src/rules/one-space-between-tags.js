const rule = 'one-space-between-tags';
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const appendTagPerLine = (track, tag) => {
  const {lines} = track;
  if (track.line !== tag.location.line) {
    track.line = tag.location.line;
    lines.push([tag]);
  } else {
    lines[lines.length - 1].push(tag);
  }
  return track;
};

const distance = (tag1, tag2) => {
  if (!tag2) {
    return 1;
  }
  return tag2.location.column - tag1.location.column - tag1.name.length;
};

const createError = ([dist, tag, nextTag]) => {
  return {
    line: tag.location.line,
    rule: rule,
    message: 'There is more than one space between the tags ' +
      tag.name + ' and ' + nextTag.name,
  };
};

const collectErrorsPerLine = (tags) => {
  return tags.map((tag, index, tags) => {
    const nextTag = tags[index + 1];
    return [distance(tag, nextTag), tag, nextTag];
  })
    .filter(([dist]) => dist > 1)
    .map(createError);
};

const testTags = (allTags) => {
  if (allTags.length === 0) {
    return [];
  }
  const tagsPerLine = allTags.reduce(appendTagPerLine, {
    lines: [],
    line: allTags[0].location.line - 1,
  }).lines;
  return intoArray(flatMap(collectErrorsPerLine))(tagsPerLine);
};

function run(feature) {
  const featureTagErrors = testTags(feature.tags);
  const scenarioTagErrors = intoArray(compose(
    filter(isScenario),
    map(({tags}) => tags),
    flatMap(testTags)
  ))(feature.children || []);

  return featureTagErrors.concat(scenarioTagErrors);
}

module.exports = {
  run: run,
  name: rule,
  isValidConfig: () => true,
};

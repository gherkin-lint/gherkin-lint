const rule = 'use-and';
const {
  filter,
  flatMap,
  intoArray,
  reduce,
} = require('../utils/main');
const {getFeatureNodes} = require('../utils/selectors');

const createError = ({keyword, location, text}) => {
  return {
    message: `Step "${keyword}${text}" should use And instead of ${keyword}`,
    rule: rule,
    line: location.line,
  };
};

const appendErrors = (track, step) => {
  if (step.keyword !== track.previous) {
    track.previous = step.keyword;
  } else {
    track.errors.push(createError(step));
  }
  return track;
};

const useAnd = (feature) => {
  return intoArray(flatMap((node) => {
    return reduce(
      filter(({keyword}) => keyword !== 'And ')(appendErrors), {
        errors: [],
      }
    )(node.steps).errors;
  }))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: useAnd,
  isValidConfig: () => true,
};

const rule = 'use-and';
const {
  filter,
  reduce,
} = require('../utils/main');
const {checkFeatureNodes} = require('../utils/check-utils');

const createError = ({keyword, location, text}) => ({
  message: `Step "${keyword}${text}" should use And instead of ${keyword}`,
  rule: rule,
  line: location.line,
});

const appendErrors = (track, step) => {
  if (step.keyword !== track.previous) {
    track.previous = step.keyword;
  } else {
    track.errors.push(createError(step));
  }
  return track;
};

const useAnd = (feature) => {
  return checkFeatureNodes((node) => {
    return reduce(
      filter(({keyword}) => keyword !== 'And ')(appendErrors), {
        errors: [],
      }
    )(node.steps).errors;
  })(feature);
};

module.exports = {
  name: rule,
  run: useAnd,
  isValidConfig: () => true,
};

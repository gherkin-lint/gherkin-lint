const rule = 'use-and';
const {reduce} = require('../utils/generic');
const {filter} = require('../utils/transducers');
const {flatMapFeatureNodes} = require('../utils/gherkin');

const createError = ({keyword, location, text}) => ({
  type: 'rule',
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
  return flatMapFeatureNodes((node) => {
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

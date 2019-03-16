const _ = require('lodash');
const rule = 'use-and';

function useAnd(feature) {
  const errors = [];
  if (feature && feature.children) {
    feature.children.forEach(function(child) {
      let previousKeyword = undefined;
      child.steps.forEach(function(step) {
        if (step.keyword === 'And ') {
          return;
        }
        if (step.keyword === previousKeyword) {
          errors.push(createError(step));
        }
        previousKeyword = step.keyword;
      });
    });
  }

  return errors;
}

function createError({keyword, location, text}) {
  return {
    message: `Step "${keyword}${text}" should use And instead of ${keyword}`,
    rule: rule,
    line: location.line,
  };
}

module.exports = {
  name: rule,
  run: useAnd,
  isValidConfig: _.stubTrue,
};

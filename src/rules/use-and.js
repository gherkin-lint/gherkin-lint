var rule = 'use-and';

function useAnd(feature) {
  var errors = [];
  if (feature && feature.children) {
    feature.children.forEach(function(child) {
      var previousKeyword = undefined;
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

function createError(step) {
  return {message: 'Step "' + step.keyword + step.text + '" should use And instead of ' + step.keyword,
    rule   : rule,
    line   : step.location.line};
}

module.exports = {
  name: rule,
  run: useAnd
};

var rule = 'no-background-only-scenario';

function run(feature) {
  if (!feature) {
    return [];
  }

  var errors = [];
  
  feature.children.forEach(function(child) {
    if (child.background) {
      if (feature.children.length <= 2) {
        // as just one background is allowed, if there is a background in the feature,
        // there must be at least, three elements in the feature to have, more than
        // one scenario
        errors.push(createError(child.background));
      }
    }
  });
  return errors;
}

function createError(background) {
  return {
    message: 'Backgrounds are not allowed when there is just one scenario.',
    rule   : rule,
    line   : background.location.line};
}

module.exports = {
  name: rule,
  run: run
};

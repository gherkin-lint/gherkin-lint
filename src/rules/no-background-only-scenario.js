var rule = 'no-background-only-scenario';

function noBackgroundEmptyScenario(feature) {
  var errors = [];
  
  if (feature.children) {
    feature.children.forEach(function(child) {
      if (child.type ==='Background') {
        if(feature.children.length <= 2) {
          // as just one background is allowed, if there is a background in the feature,
          // there must be at least, three elements in the feature to have, more than
          // one scenario
          errors.push(createError(child));
        }
      }
    });
  }
  return errors;
}

function createError(background) {
  return {message: 'Backgrounds are not allowed when there is just one scenario.',
    rule   : rule,
    line   : background.location.line};
}

module.exports = {
  name: rule,
  run: noBackgroundEmptyScenario
};

var rule = 'no-empty-background';

function noEmptyBackground(feature) {
  var errors = [];
  feature.children.forEach(function(child) {
    if (child.type ==='Background') {
      if(child.steps.length === 0) {
        errors.push(createError(child));
      }
    }
  });
  return errors;
}

function createError(background) {
  return {message: 'Empty backgrounds are not allowed.',
          rule   : rule,
          line   : background.location.line};
}

module.exports = {
  name: rule,
  run: noEmptyBackground
};

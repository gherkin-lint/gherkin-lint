var rule = 'no-empty-background';

function run(feature) {
  if (!feature) {
    return [];
  }

  var errors = [];

  feature.children.forEach(function(child) {
    if (child.background) {
      if (child.background.steps.length === 0) {
        errors.push(createError(child.background));
      }
    }
  });
  return errors;
}

function createError(background) {
  return {
    message: 'Empty backgrounds are not allowed.',
    rule   : rule,
    line   : background.location.line
  };
}

module.exports = {
  name: rule,
  run: run
};

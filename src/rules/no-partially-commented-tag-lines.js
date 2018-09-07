var rule = 'no-partially-commented-tag-lines';

function noPartiallyCommentedTagLines(feature) {
  var errors = [];
  if (feature.children) {
    feature.children.forEach(function(scenario) {
      if (scenario.tags) {
        scenario.tags.forEach(function(tag) {
          if (tag.name.indexOf('#') > 0) {
            errors.push({message: 'Partially commented tag lines not allowed ',
              rule   : rule,
              line   : tag.location.line});
          }
        });
      }
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noPartiallyCommentedTagLines
};

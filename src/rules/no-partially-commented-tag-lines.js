var rule = 'no-partially-commented-tag-lines';

function noPartiallyCommentedTagLines(parsedFile) {
  var errors = [];
  parsedFile.scenarioDefinitions.forEach(function(scenario) {
    scenario.tags.forEach(function(tag) {
      if (tag.name.indexOf('#') > 0) {
        errors.push({message: 'Partially commented tag lines not allowed ',
                     rule   : rule,
                     line   : parsedFile.location.line});
      }
    });
  });
  return errors;
}

module.exports = {
  name: rule,
  run: noPartiallyCommentedTagLines
};

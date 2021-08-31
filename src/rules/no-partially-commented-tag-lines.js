const rule = 'no-partially-commented-tag-lines';

function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  checkTags(feature, errors);
  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, errors);
      });
    }
  });

  return errors;
}

function checkTags(node, errors) {
  node.tags.forEach(tag => {
    if (tag.name.indexOf('#') > 0) {
      errors.push({
        message: 'Partially commented tag lines not allowed',
        rule   : rule,
        line   : tag.location.line,
        column : tag.location.column,
      });
    }
  });
}

module.exports = {
  name: rule,
  run: run
};

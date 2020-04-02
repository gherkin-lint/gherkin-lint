const rule = 'no-partially-commented-tag-lines';

function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  checkTags(feature, errors);

  if (feature.children) {
    feature.children.forEach(function(child) {
      if (child.scenario) {
        checkTags(child.scenario, errors);

        child.scenario.examples.forEach(function(example) {
          checkTags(example, errors);
        });
      }
    });
  }
  return errors;
}

function checkTags(node, errors) {
  if (node && node.tags) {
    node.tags.forEach(function(tag) {
      if (tag.name.indexOf('#') > 0) {
        errors.push({message: 'Partially commented tag lines not allowed',
          rule   : rule,
          line   : tag.location.line});
      }
    });
  }
}

module.exports = {
  name: rule,
  run: run
};

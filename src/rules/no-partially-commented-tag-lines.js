var rule = 'no-partially-commented-tag-lines';

function noPartiallyCommentedTagLines(feature) {
  var errors = [];

  checkTags(feature, errors);
  
  if (feature.children) {
    feature.children.forEach(function(child) {
      checkTags(child, errors);
  
      if (child.examples) {
        child.examples.forEach(function(example) {
          checkTags(example, errors);
        });
      }
    });
  }
  return errors;
}

function checkTags(node, errors) {
  if (node.tags) {
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
  run: noPartiallyCommentedTagLines
};

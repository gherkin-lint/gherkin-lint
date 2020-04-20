/**
* @module rules/no-multiple-empty-lines
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-partially-commented-tag-lines';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
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


/**
* @function checkTags
* @private
* @param node    {Gerkin.Feature|Gerkin.Scenario|Gerkin.Example} - A Gherkin object that has tags
* @param errors  {Array}                                         - A reference to the rule's errors array that gets filled as errors get detected
**/
function checkTags(node, errors) {
  node.tags.forEach(tag => {
    if (tag.name.indexOf('#') > 0) {
      errors.push({
        message: 'Partially commented tag lines not allowed',
        rule   : name,
        line   : tag.location.line
      });
    }
  });
}


module.exports = {
  name,
  run,
};

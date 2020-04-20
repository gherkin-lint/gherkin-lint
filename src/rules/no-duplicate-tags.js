/**
* @module rules/no-duplicate-tags
**/
const _ = require('lodash');


/** The name of the rule
* @member {string} name
**/
const name = 'no-duplicate-tags';


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

  verifyTags(feature, errors);
  feature.children.forEach(child => {
    if (child.scenario) {
      verifyTags(child.scenario, errors);
      child.scenario.examples.forEach(example => {
        verifyTags(example, errors);
      });
    }
  });
  return errors;
}


/**
* @function verifyTags
* @private
* @description Verifies that a node doesn't have the same tag multiple times
* @param node    {Gerkin.Feature|Gerkin.Scenario|Gerkin.Example} - A Gherkin object that has tags
* @param errors  {Array}                                         - A reference to the array of the detected errors which the function populates
**/ 
function verifyTags(node, errors) {
  const failedTagNames = [];
  const uniqueTagNames = [];
  node.tags.forEach(tag => {
    if (!_.includes(failedTagNames, tag.name)) {
      if (_.includes(uniqueTagNames, tag.name)) {
        errors.push({message: 'Duplicate tags are not allowed: ' + tag.name,
          rule   : name,
          line   : tag.location.line});
        failedTagNames.push(tag.name);
      } else  {
        uniqueTagNames.push(tag.name);
      }
    }
  });
}


module.exports = {
  name,
  run
};

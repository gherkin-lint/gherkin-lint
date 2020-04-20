/**
* @module rules/no-examples-in-scenarios
**/
const gherkinUtils = require('./utils/gherkin.js');

/** The name of the rule
* @member {string} name
**/
const name = 'no-examples-in-scenarios';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/objects
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  feature.children.forEach(child => {
    if (child.scenario) {
      const nodeType = gherkinUtils.getNodeType(child.scenario, feature.language);
      
      if (nodeType == 'Scenario' && child.scenario.examples.length) {
        errors.push({
          message: 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead',
          rule   : name,
          line   : child.scenario.location.line,
        });
      }
    }
  });
  return errors;
}


module.exports = {
  name,
  run,
};
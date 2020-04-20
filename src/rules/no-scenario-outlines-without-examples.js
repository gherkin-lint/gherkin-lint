/**
* @module rules/no-scenario-outlines-without-examples
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'no-scenario-outlines-without-examples';


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
  feature.children.forEach(child => {
    if (child.scenario) {
      const scenario = child.scenario;
      const nodeType = gherkinUtils.getNodeType(scenario, feature.language);
      if (nodeType === 'Scenario Outline' &&  (!_.find(scenario.examples, 'tableBody') || !_.find(scenario.examples, 'tableBody')['tableBody'].length)) {
        errors.push({
          message: 'Scenario Outline does not have any Examples',
          rule   : name,
          line   : scenario.location.line
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

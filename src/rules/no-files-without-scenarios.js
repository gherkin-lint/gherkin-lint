/**
* @module rules/no-files-without-scenarios
**/
const name = 'no-files-without-scenarios';


/**
* @function filterScenarios
* @private
* @param node    {Gerkin.Feature.Childe} - A Gherkin feature child (eg background, scenario)
* @returns       {boolean}               - Returns true if the child is a scenario (or scenario outline) and false otherwise                               
**/    
function filterScenarios(child) {
  return child.scenario != undefined;
}


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  if (!feature.children.some(filterScenarios)) {
    errors.push({
      message: 'Feature file does not have any Scenarios',
      rule   : name,
      line   : 1
    });
  }
  return errors;
}


module.exports = {
  name,
  run,
};

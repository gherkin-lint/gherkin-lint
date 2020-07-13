/**
* @module rules/no-unnamed-scenarios
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-unnamed-scenarios';


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
  feature.children.forEach(child => {
    if (child.scenario && !child.scenario.name) {
      errors.push({
        message: 'Missing Scenario name',
        rule   : name,
        line   : child.scenario.location.line});
    }
  });
  return errors;
}


module.exports = {
  name,
  run,
};

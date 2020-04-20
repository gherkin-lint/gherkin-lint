/**
* @module rules/no-empty-background
**/

/** The name of the rule
* @member {string} name
**/
const name = 'no-empty-background';


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
    if (child.background) {
      if (child.background.steps.length === 0) {
        errors.push({
          message: 'Empty backgrounds are not allowed.',
          rule   : name,
          line   : child.background.location.line
        });
      }
    }
  });
  return errors;
}


module.exports = {
  name,
  run
};

/**
* @module rules/no-background-only-scenario
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-background-only-scenario';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @alias module:run
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
      if (feature.children.length <= 2) {
        // as just one background is allowed, if there is a background in the feature,
        // there must be at least, three elements in the feature to have, more than
        // one scenario
        errors.push({
          message: 'Backgrounds are not allowed when there is just one scenario.',
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
  run,
};

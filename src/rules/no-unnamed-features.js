/**
* @module rules/no-unnamed-features
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-unnamed-features';


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  let errors = [];

  if (!feature || !feature.name) {
    const location = feature ? feature.location.line : 0;
    errors.push({
      message: 'Missing Feature name',
      rule   : name,
      line   : location
    });
  }
  return errors;
}


module.exports = {
  name,
  run,
};

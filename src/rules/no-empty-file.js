/**
* @module rules/no-empty-file
**/


// --- Dependencies ---
const _ = require('lodash');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'no-empty-file';


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  let errors = [];
  if (_.isEmpty(feature)) {
    errors.push({
      message: 'Empty feature files are disallowed',
      rule   : name,
      line   : 1
    });
  }
  return errors;
}


module.exports = {
  name,
  run
};

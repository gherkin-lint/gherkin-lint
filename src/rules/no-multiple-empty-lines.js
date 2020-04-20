/**
* @module rules/no-multiple-empty-lines
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-multiple-empty-lines';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param file          {Object}         - An Object containing the lines and relative path of the feature file
* @returns             {Array}          - The detected errors
**/
function run(unused, file) {
  let errors = [];
  for (let i = 0; i < file.lines.length - 1; i++) {
    if (file.lines[i].trim() === '' && file.lines[i + 1].trim() == '') {
      errors.push({message: 'Multiple empty lines are not allowed',
        rule   : name,
        line   : i + 2});
    }
  }
  return errors;
}


module.exports = {
  name,
  run,
};

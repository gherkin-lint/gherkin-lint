/**
* @module rules/no-trailing-spaces
**/

/** The name of the rule
* @member {string} name
**/
const name = 'no-trailing-spaces';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param file          {Object}         - An Object containing the lines and relative path of the feature file
* @returns             {Array}          - The detected errors
**/
function run(unused, file) {
  let errors = [];
  let lineNo = 1;
  file.lines.forEach(line => {
    if (/[\t ]+$/.test(line)) {
      errors.push({message: 'Trailing spaces are not allowed',
        rule   : name,
        line   : lineNo});
    }

    lineNo++;
  });
  
  return errors;
}


module.exports = {
  name,
  run,
};

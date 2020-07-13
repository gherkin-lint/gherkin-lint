/**
* @module rules/use-and
**/


// --- Dependencies ---
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'use-and';


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
    const node = child.background || child.scenario;
    let previousKeyword = undefined;

    node.steps.forEach(step => {
      const keyword = gherkinUtils.getLanguageInsitiveKeyword(step, feature.language);
      if (keyword === 'and') {
        return;
      }
      if (keyword === previousKeyword) {
        errors.push({
          message: 'Step "' + step.keyword + step.text + '" should use And instead of ' + step.keyword,
          rule   : name,
          line   : step.location.line
        });
      }
      previousKeyword = keyword;
    });
  });

  return errors;
}


module.exports = {
  name,
  run,
};

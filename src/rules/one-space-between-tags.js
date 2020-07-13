/**
* @module rules/one-space-between-tags
**/


// --- Dependencies ---
const _ = require('lodash');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'one-space-between-tags';


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  if (!feature) {
    return;
  }
  let errors = [];
  
  checkTags(feature, errors);
  
  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, errors);
      });
    }
  });
  
  return errors;
}


/**
* @function checkTags
* @private
* @param node   {Gerkin.Feature|Gerkin.Scenario|Gerkin.Example} - A Gherkin object that has tags
* @param errors {Array}                                         - A reference to the rule's errors array that gets filled as errors get detected
**/
function checkTags(node, errors) {
  _(node.tags)
    .groupBy('location.line')
    .sortBy('location.column')
    .forEach(tags => {
      _.range(tags.length - 1)
        .map(i => {
          if (tags[i].location.column + tags[i].name.length < tags[i + 1].location.column - 1) {
            errors.push({
              line: tags[i].location.line,
              rule: name,
              message: 'There is more than one space between the tags ' +
                        tags[i].name + ' and ' + tags[i + 1].name
            });
          }
        });
    });
}


module.exports = {
  run,
  name,
};

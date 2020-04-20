/**
* @module rules/no-restricted-tags
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'no-restricted-tags';


/** The no-restricted-tags rule should be configured with the list of restricted tags
@example <caption>The rule configuration should look like this</configuration>
{
  "no-restricted-tags": ["on", {"tags": ["@watch", "@wip", "@todo"]}]
}
**/
const availableConfigs = {
  'tags': []
};


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
* @returns             {Array}          - The detected errors
**/
function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }
  
  const forbiddenTags = configuration.tags;
  const language = feature.language;
  let errors = [];

  checkTags(feature, language, forbiddenTags, errors);
  
  feature.children.forEach(child => {
    // backgrounds don't have tags
    if (child.scenario) {
      checkTags(child.scenario, language, forbiddenTags, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, language, forbiddenTags, errors);
      });
    }      
  });
  
  return errors;
}


function checkTags(node, language, forbiddenTags, errors) {
  const nodeType = gherkinUtils.getNodeType(node, language);
  node.tags.forEach(tag => {
    if (_.includes(forbiddenTags, tag.name)) {
      errors.push({
        message: `Forbidden tag ${tag.name} on ${nodeType}`,
        rule   : name,
        line   : tag.location.line
      });
    }
  });
}


module.exports = {
  name,
  run,
  availableConfigs,
};

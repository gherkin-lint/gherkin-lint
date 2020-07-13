/**
* @module rules/required-tags
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'required-tags';


/** The required-tags rule should be configured with the list of required tags.
@example <caption>The rule configuration should look like this</configuration>
{
  "required-tags": ["on", {"tags": ["@requiredTag1", "@requiredTag2"]}]
}
**/
const availableConfigs = {
  tags: []
};


/** Require tags/patterns of tags on Scenarios 
* @function run
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
* @returns             {Array}          - The detected errors
**/
function run(feature, unused, config) {
  if (!feature) {
    return [];
  }

  let errors = [];
  feature.children.forEach((child) => {
    if (child.scenario) {
      const type = gherkinUtils.getNodeType(child.scenario, feature.language);

      config.tags.forEach(requiredTag => {
        const found = child.scenario.tags.some(tagObj =>  RegExp(requiredTag).test(tagObj.name));
        
        if (!found) {
          // Get the unique scenario tag lines 
          const scenarioTagLines = _.uniq(child.scenario.tags.map(t => t.location.line));
          errors.push({
            message: `No tag found matching ${requiredTag} for ${type}`,
            rule: name,
            line: scenarioTagLines.join(',')
          });
        }
      });
    }
  });
  
  return errors;
}


module.exports = {
  name,
  run,
  availableConfigs,
};

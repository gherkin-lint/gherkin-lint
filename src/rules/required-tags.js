const gherkinUtils = require('./utils/gherkin.js');

const rule = 'required-tags';
const availableConfigs = {
  tags: []
};


function checkTagExists(requiredTag, scenarioTags, scenarioType) {
  const result = scenarioTags.length == 0
    || scenarioTags.some((tagObj) => RegExp(requiredTag).test(tagObj.name));
  if (!result) {
    const lines = [];
    scenarioTags.forEach((tag) => {
      if (lines.indexOf(tag.location.line) === -1) {
        lines.push(tag.location.line);
      }
    });
    return {
      message: `No tag found matching ${requiredTag} for ${scenarioType}`,
      rule,
      line: lines.join(',')
    };
  }
  return result;
}

function run(feature, unused, config) {
  if (!feature) {
    return [];
  }

  let errors = [];
  feature.children.forEach((child) => {
    if (child.scenario) {
      const type = gherkinUtils.getNodeType(child.scenario, feature.language);

      // Check each Scenario for the required tags
      const requiredTagErrors = config.tags
        .map((requiredTag) => {
          return checkTagExists(requiredTag, child.scenario.tags || [], type);
        })
        .filter((item) =>
          typeof item === 'object' && item.message
        );

      // Update errors
      errors = errors.concat(requiredTagErrors);
    }
  });
  
  return errors;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

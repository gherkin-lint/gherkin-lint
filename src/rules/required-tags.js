const rule = 'required-tags';
const availableConfigs = {
  tags: []
};

const checkTagExists = (requiredTag, scenarioTags, scenarioType) => {
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
};

const checkRequiredTagsExistInScenarios = (feature, fileName, config) => {
  let errors = [];
  if (feature.children) {
    feature.children.forEach((scenario) => {
      // Check each Scenario for the required tags
      const requiredTagErrors = config.tags
        .map((requiredTag) => {
          return checkTagExists(requiredTag, scenario.tags || [], scenario.type);
        })
        .filter((item) =>
          typeof item === 'object' && item.message
        );
      // Update errors
      errors = errors.concat(requiredTagErrors);
    });
  }
  return errors;
};

module.exports = {
  name: rule,
  run: checkRequiredTagsExistInScenarios,
  availableConfigs: availableConfigs
};

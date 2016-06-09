var rule = 'no-files-without-scenarios';

function noFilesWithoutScenarios(parsedFile) {
  if (!parsedFile.scenarioDefinitions.length) {
    return {message: 'Feature file does not have any Scenarios',
            rule   : rule,
            line   : 1};
  }
}

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios
};

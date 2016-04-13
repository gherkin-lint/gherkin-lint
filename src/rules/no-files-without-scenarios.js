var rule = "no-files-without-scenarios";

function noFilesWithoutScenarios(parsedFile, errors) {
  if (!parsedFile.scenarioDefinitions) {
    return {message: "The Feature doesn't have any Scenarios",
            rule   : rule,
            line   : 0};
  }
}

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios
};

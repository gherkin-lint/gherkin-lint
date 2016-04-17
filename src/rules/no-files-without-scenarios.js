var rule = "no-files-without-scenarios";

function noFilesWithoutScenarios(parsedFile) {
  if (!parsedFile.scenarioDefinitions.length) {
    return {message: "The Feature doesn't have any Scenarios",
            rule   : rule,
            line   : 0};
  }
}

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios
};

module.exports = {
  isScenario: ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1,
  getType: ({type}) => type,
  getFeatureNodes: ({children}) => children || [],
  getSteps: ({steps}) => steps,
  getExamples: ({examples = []}) => examples,
  getTableBody: ({tableBody}) => tableBody,
  getTableHeader: ({tableHeader}) => tableHeader,
};

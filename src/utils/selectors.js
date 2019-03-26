module.exports = {
  getType: ({type}) => type,
  getFeatureNodes: ({children}) => children || [],
  getSteps: ({steps}) => steps,
  getExamples: ({examples}) => examples,
  getTableBody: ({tableBody}) => tableBody,
  getTableHeader: ({tableHeader}) => tableHeader,
};

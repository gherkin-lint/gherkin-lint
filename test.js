const gherkin = require('gherkin')
 
const options = {
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}
const stream = gherkin.fromPaths(['test-data-wip/UseAnd.feature'])
console.log(stream)
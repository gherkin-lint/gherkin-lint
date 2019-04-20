const rule = 'no-partially-commented-tag-lines';
const {flatMap} = require('../utils/generic');
const {flatMapNodeTags} = require('../utils/gherkin');

const createError = (tag) => tag.name.indexOf('#') < 0 ? [] : [{
  type: 'rule',
  message: 'Partially commented tag lines not allowed ',
  rule: rule,
  line: tag.location.line,
}];

module.exports = {
  name: rule,
  run: flatMapNodeTags(({tags}) => flatMap(createError)(tags)),
  isValidConfig: () => [],
};

const _ = require('lodash');
const rule = 'no-unnamed-features';

function noUnNamedFeatures(feature) {
  if (!feature || !feature.name) {
    return {message: 'Missing Feature name',
      rule: rule,
      line: feature.location && feature.location.line || 0};
  }
}

module.exports = {
  name: rule,
  run: noUnNamedFeatures,
  isValidConfig: _.stubTrue,
};

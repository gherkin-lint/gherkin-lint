var rule = 'no-unnamed-features';

function noUnNamedFeatures(feature) {
  var errors = [];
  if (!feature || !feature.name) {
    errors.push({
      message: 'Missing Feature name',
      rule   : rule,
      line   : feature.location && feature.location.line || 0});
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noUnNamedFeatures
};

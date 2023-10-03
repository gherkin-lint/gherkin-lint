const rule = 'no-unnamed-features';

function run(feature) {
  let errors = [];

  if (!feature || !feature.name) {
    const location = feature ? feature.location : {line: 0, column: 0};
    errors.push({
      message: 'Missing Feature name',
      rule   : rule,
      line   : location.line,
      column : location.column,
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: run
};

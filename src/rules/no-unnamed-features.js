const rule = 'no-unnamed-features';

const noUnNamedFeatures = ({name, location}) => {
  return !name && location ? [{
    message: 'Missing Feature name',
    rule: rule,
    line: location.line,
  }] : [];
};

module.exports = {
  name: rule,
  run: noUnNamedFeatures,
  isValidConfig: () => true,
};

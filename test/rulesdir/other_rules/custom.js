const rule = 'another-custom';

function custom() {
  return [
    {
      type: 'rule',
      message: 'Another custom error',
      rule: rule,
      line: 456,
    },
  ];
}

module.exports = {
  name: rule,
  run: custom,
  isValidConfig: () => true,
};

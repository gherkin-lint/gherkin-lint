var rule = 'another-custom';

function custom() {
  return [
    {
      message: 'Another custom error',
      rule   : rule,
      line   : 456,
      column: 23
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  availableConfigs: []
};

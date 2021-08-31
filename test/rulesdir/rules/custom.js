var rule = 'custom';

function custom() {
  return [
    {
      message: 'Custom error',
      rule   : rule,
      line   : 123,
      column : 21
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  availableConfigs: []
};

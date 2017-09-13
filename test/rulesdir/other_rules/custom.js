var rule = 'another-custom';

function custom() {
  return [
    {
      message: 'Another custom error',
      rule   : rule,
      line   : 456
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  availableConfigs: []
};

const jsonFormatter = require('./json.js');
const stylishFormatter = require('./stylish.js');
const style = require('./style');
const defaults = require('../defaults');

module.exports = (format = defaults.format) => {
  if (format === 'json') {
    return jsonFormatter;
  } else if (format === 'stylish') {
    return stylishFormatter;
  }
  return {
    format() {
      return [
        style.boldError('Unsupported format. The supported formats are json and stylish.'),
      ];
    },
  };
};

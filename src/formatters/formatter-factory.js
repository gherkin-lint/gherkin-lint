const jsonFormatter = require('./json.js');
const stylishFormatter = require('./stylish.js');
const style = require('./style');

module.exports = (format) => {
  if (format === 'json') {
    return jsonFormatter;
  } else if (!format || format == 'stylish') {
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

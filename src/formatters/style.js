module.exports = {
  gray(text) {
    return `\x1b[38;5;243m${text}\x1b[0m`;
  },

  underline(text) {
    return `\x1b[0;4m${text}\x1b[24m`;
  },

  boldError(text) {
    return `\x1b[31m\x1b[1m${text}\x1b[0m`;
  },

  error(text) {
    return `\x1b[31m${text}\x1b[0m`;
  },
};

const sinon = require('sinon');

exports.mochaHooks = {
  beforeEach() {
    this.sinon = sinon.createSandbox();
  },
  afterEach() {
    this.sinon.restore();
  },
};

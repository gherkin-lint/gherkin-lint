var assert = require('chai').assert;
var expect = require('chai').expect;
var nameLength = require('../../../src/rules/name-length.js');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var fs = require('fs');

var expectedResults = require('./test-results/results.js');

require('mocha-sinon');

function getErrors(fileName, configuration) {
  var file = fs.readFileSync('test/rules/name-length/test-data/' + fileName, 'utf8');
  var parsedFile = parser.parse(file).feature;
  return nameLength.run(parsedFile, undefined, configuration);
}


describe('Name length rule', function() {
  it('doesn\'t raise errors when the default configuration is used and there are no length violations', function() {
    var configuration = ['on'];
    var fileName = 'CorrectLength.feature';
    var errors = getErrors(fileName, configuration);
    expect(errors).to.be.empty;
  });

  it('detects errors for features, scenarios, scenario outlines and steps', function() {
    var configuration = ['on'];
    var fileName = 'WrongLength.feature';
    var errors = getErrors(fileName, configuration);
    assert.sameDeepMembers(errors, expectedResults.wrongLength);
  });

});

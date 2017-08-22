var assert = require('chai').assert;
var expect = require('chai').expect;
var rule = require('../../../src/rules/no-superfluous-tags.js');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var fs = require('fs');

var expectedResults = require('./test-results/results.js');

require('mocha-sinon');

function getErrors(fileName, configuration) {
  var file = fs.readFileSync('test/rules/no-superfluous-tags/test-data/' + fileName, 'utf8');
  var parsedFile = parser.parse(file).feature;
  return rule.run(parsedFile, undefined, configuration);
}

describe('No Superfluous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    var configuration = ['on'];
    var fileName = 'NoViolations.feature';
    var errors = getErrors(fileName, configuration);
    expect(errors).to.be.empty;
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    var configuration = ['on'];
    var fileName = 'Violations.feature';
    var errors = getErrors(fileName, configuration);
    assert.sameDeepMembers(errors, expectedResults.noSuperfluousTags);
  });

});

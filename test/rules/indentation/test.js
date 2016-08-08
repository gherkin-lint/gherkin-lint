var assert = require('chai').assert;
var expect = require('chai').expect;
var indentation = require('../../../src/rules/indentation.js');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var fs = require('fs');

var expectedResults = require('./test-results/results.js');

require('mocha-sinon');

function getErrors(fileName, configuration) {
  var file = fs.readFileSync('test/rules/indentation/test-data/' + fileName, 'utf8');
  var parsedFile = parser.parse(file).feature;
  return indentation.run(parsedFile, undefined, configuration);
}


describe('Indentation rule', function() {
  it('doesn\'t raise errors when the default conifguration is used and there are no indentation violations (spaces)', function() {
    var configuration = ['on'];
    var fileName = 'CorrectIndentationSpaces.feature';
    var errors = getErrors(fileName, configuration);
    expect(errors).to.be.empty;
  });

  it('doesn\'t raise errors when the default conifguration is used are and there no indentation violations (tabs)', function() {
    var configuration = ['on'];
    var fileName = 'CorrectIndentationTabs.feature';
    var errors = getErrors(fileName, configuration);
    expect(errors).to.be.empty;
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (spaces)', function() {
    var configuration = ['on'];
    var fileName = 'WrongIndentationSpaces.feature';
    var errors = getErrors(fileName, configuration);
    assert.sameDeepMembers(errors, expectedResults.wrongIndentationEnglish);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (tabs)', function() {
    var configuration = ['on'];
    var fileName = 'WrongIndentationTabs.feature';
    var errors = getErrors(fileName, configuration);
    assert.sameDeepMembers(errors, expectedResults.wrongIndentationEnglish);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps in other languages', function() {
    var configuration = ['on'];
    var fileName = 'WrongIndentationDifferentLanguage.feature';
    var errors = getErrors(fileName, configuration);
    assert.sameDeepMembers(errors, expectedResults.wrongIndentationGerman);
  });

  // TODO: add tests for partial configurations and fallbacks (eg rule for Step is used for Given, Then etc is rule for Given, Then, etc has not been specified)
});

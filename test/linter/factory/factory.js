const path = require('path');
const expect = require('chai').expect;
const linterFactory = require('../../../src/linter/factory');

const pathToDefaultRules = path.resolve(__dirname, '..', '..', '..', 'src', 'rules');
const pathToLocalRules = path.join(__dirname, 'rules'); // absolute path;
const pathToOtherRules = path.join('test', 'linter', 'factory', 'other_rules'); // relative path from root

describe('factory', function() {
  it('linter that fails', function() {
    const featureFile = path.join(__dirname, 'failure.feature');
    const linter = linterFactory({
      config: path.join(__dirname, '.gherkin-lintrc'),
      format: 'stylish',
      rulesDirs: [
        pathToDefaultRules, pathToLocalRules, pathToOtherRules,
      ],
      args: [featureFile],
    });
    const result = linter.lint();

    expect(result.logType).to.be.equal('error');
    expect(result.exit).to.be.equal(1);
    expect(result.errorLines[0]).to.include('failure.feature');
    expect(result.errorLines[1]).to.include('Wrong indentation for "Feature", expected indentation level of 0, but got 4');
    expect(result.errorLines[2]).to.include('Another custom-list error');
    expect(result.errorLines[3]).to.include('Custom error');
    expect(result.errorLines[4]).to.include('Another custom error');
    expect(result.errorLines[5]).to.include('\n');
    expect(result.errorLines.length).to.be.equal(6);
  });

  it('linter that succeed', function() {
    const featureFile = path.join(__dirname, 'success.feature');
    const linter = linterFactory({
      config: path.join(__dirname, '.indentation-lintrc'),
      format: 'stylish',
      rulesDirs: [pathToDefaultRules],
      args: [featureFile],
    });
    const result = linter.lint();

    expect(result).to.be.deep.equal({
      logType: 'log',
      exit: 0,
      errorLines: [],
    });
  });

  it('config file not found', function() {
    const featureFile = path.join(__dirname, 'success.feature');
    const linter = linterFactory({
      config: path.join(__dirname, '.not-found-lintrc'),
      format: 'stylish',
      rulesDirs: [pathToDefaultRules],
      args: [featureFile],
    });
    const result = linter.lint();

    expect(result.logType).to.be.equal('error');
    expect(result.exit).to.be.equal(1);
    expect(result.errorLines.length).to.be.equal(1);
    expect(result.errorLines[0]).to.include('Could not find specified config file');
    expect(result.errorLines[0]).to.include('.not-found-lintrc');
  });

  it('default config file not found', function() {
    const featureFile = path.join(__dirname, 'success.feature');
    const linter = linterFactory({
      format: 'stylish',
      rulesDirs: [pathToDefaultRules],
      args: [featureFile],
    });
    const result = linter.lint();

    expect(result.logType).to.be.equal('error');
    expect(result.exit).to.be.equal(1);
    expect(result.errorLines.length).to.be.equal(1);
    expect(result.errorLines[0]).to.include('Could not find default config file ".gherkin-lintrc" in the working directory.');
    expect(result.errorLines[0]).to.include('To use a custom name/path provide the config file using the "-c" arg.');
  });

  it('default format is stylish', function() {
    const featureFile = path.join(__dirname, 'success.feature');
    const linter = linterFactory({
      rulesDirs: [pathToDefaultRules],
      args: [featureFile],
    });
    const result = linter.lint();

    expect(result.logType).to.be.equal('error');
    expect(result.exit).to.be.equal(1);
    expect(result.errorLines.length).to.be.equal(1);
    expect(result.errorLines[0]).to.include('Could not find default config file ".gherkin-lintrc" in the working directory.');
    expect(result.errorLines[0]).to.include('To use a custom name/path provide the config file using the "-c" arg.');
  });
});

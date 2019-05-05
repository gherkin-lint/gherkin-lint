var assert = require('chai').assert;
var expect = require('chai').expect;
var featureFinder = require('../../dist/feature-finder.js');
var mockFs = require('mock-fs');

describe('Feature finder', function() {
  beforeEach(function() {
    this.sinon.stub(console, 'error');
    this.sinon.stub(process, 'exit');
    mockFs({
      'folder/with/found/features': {
        'a.feature': '',
        'folder': { 'b.feature': '' },
        'c.txt': ''
      },
      '../folder/with/unfound/features': {
        'd.feature': '',
        'e.txt': ''
      },
      'feature': {
        'f.txt': ''
      }
    });
  });

  afterEach(function() {
    mockFs.restore();
    console.error.restore(); // eslint-disable-line no-console
    process.exit.restore();
  });

  it('returns all feature files found recursively in the current directory when no path is passed to the command line', function() {
    var actual = featureFinder.getFeatureFiles([]);
    assert.deepEqual(actual, [
      'folder/with/found/features/a.feature',
      'folder/with/found/features/folder/b.feature'
    ]);
  });

  it('returns all feature files in a directory and its subfolders when a "path/to/dir/**" pattern is used', function() {
    var actual = featureFinder.getFeatureFiles(['folder/with/found/features/**']);
    assert.deepEqual(actual, [
      'folder/with/found/features/a.feature',
      'folder/with/found/features/folder/b.feature'
    ]);
  });

  it('returns all feature files in a directory when a "path/to/dir/*.feature" pattern is used', function() {
    var actual = featureFinder.getFeatureFiles(['folder/with/found/features/*.feature']);
    assert.deepEqual(actual, [
      'folder/with/found/features/a.feature'
    ]);
  });

  it('returns all feature files in a directory and its subfolders when a path to a directory is used', function() {
    var actual = featureFinder.getFeatureFiles(['folder/with/found/features/']);
    assert.deepEqual(actual, [
      'folder/with/found/features/a.feature',
      'folder/with/found/features/folder/b.feature'
    ]);
  });

  it('does not return duplicates', function() {
    var actual = featureFinder.getFeatureFiles([
      'folder/with/found/features/**',
      'path/to/fake/**'
    ]);
    assert.deepEqual(actual, [
      'folder/with/found/features/a.feature',
      'folder/with/found/features/folder/b.feature'
    ]);
  });

  it('ignores files when the --ignore argument is provided', function() {
    var actual = featureFinder.getFeatureFiles(['folder/with/found/features/**'],
      ['folder/with/found/features/**']);
    assert.deepEqual(actual, []);
  });

  it('ignores files in the .gherkin-lintignore when specified as glob patterns', function() {
    mockFs({
      '.gherkin-lintignore': 
      'folder/with/found/features/a.feature\n\n..folder/with/found/features/**'
    });
    var actual = featureFinder.getFeatureFiles(['folder/with/found/features/**']);
    assert.deepEqual(actual, []);
  });

  it('prints an error message and exits with code 1 when a bad file pattern is used', function() {
    featureFinder.getFeatureFiles(['badpattern**']);
    var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
      return args[0];
    });
    expect(consoleErrorArgs[0]).to.include('Invalid format of the feature file path/pattern:');
    expect(process.exit.args[0][0]).to.equal(1);
  });
});

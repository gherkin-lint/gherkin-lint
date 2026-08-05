const assert = require('chai').assert;
const path = require('path');
const {spawnSync} = require('child_process');
const {version} = require('../../package.json');

const cli = path.resolve(__dirname, '../../src/main.js');

describe('CLI', function() {
  it('prints the package version', function() {
    const result = spawnSync(process.execPath, [cli, '--version'], {encoding: 'utf8'});

    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), version);
  });

  it('accepts feature file arguments with a custom configuration', function() {
    const result = spawnSync(process.execPath, [
      cli,
      '--config',
      'test/config-parser/good_config.gherkinrc',
      'test/linter/NoViolations.feature',
    ], {encoding: 'utf8'});

    assert.equal(result.status, 0, result.stderr || result.stdout);
  });
});

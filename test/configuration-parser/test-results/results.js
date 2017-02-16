var chalk = require('chalk');

module.exports = {
  'config1': {
    'no-files-without-scenarios': 'on',
    'no-unnamed-features': 'on',
    'no-unnamed-scenarios': 'on',
    'no-dupe-scenario-names': 'on',
    'no-dupe-feature-names': 'on',
    'no-partially-commented-tag-lines': 'on',
    'indentation': 'on',
    'no-trailing-spaces': 'on',
    'no-multiple-empty-lines': 'off'
  },
  'config2': {
    'new-line-at-eof': [ 'on', 'yes' ]
  },
  'config3': {
    'indentation': ['on', { 'Feature': 1, 'Background': 1, 'Scenario': 1, 'Step': 1, 'given': 1, 'and': 1}]
  },
  'config4': {
    'consoleErrors': [
      chalk.red.bold('Error(s) in configuration file:'),
      chalk.red('- Rule "fake-rule" does not exist')
    ],
    'assertionMessage': 'Configuration error(s)'
  },
  'config5': {
    'consoleErrors': [
      chalk.red.bold('Error(s) in configuration file:'),
      chalk.red('- Invalid rule configuration for "indentation" -  The rule does not have the specified configuration option "featur"'),
      chalk.red('- Invalid rule configuration for "new-line-at-eof" -  The rule does not have the specified configuration option "y"')
    ],
    'assertionMessage': 'Configuration error(s)'
  }
};

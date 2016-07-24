module.exports =
{
  'config1': {
    'no-files-without-scenarios': 'on',
    'no-unamed-features': 'on',
    'no-unamed-scenarios': 'on',
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
    'indentation': ['on', { 'Feature': 0, 'Background': 0, 'Scenario': 0, 'Step': 2, 'given': 2, 'and': 3 }]
  },
  'config4': {
    'consoleErrors': [
      '\x1b[31m\x1b[1mError(s) in configuration file:\x1b[0m',
      '\x1b[31m- Rule "fake-rule" does not exist\x1b[0m'
    ],
    'assertionMessage': 'Configuration error(s)'
  },
  'config5': {
    'consoleErrors': [
      '\x1b[31m\x1b[1mError(s) in configuration file:\x1b[0m',
      '\x1b[31m- Invalid rule configuration for "indentation" -  The rule does not have the specified configuration option "featur"\x1b[0m',
      '\x1b[31m- Invalid rule configuration for "new-line-at-eof" -  The rule does not have the specified configuration option "y"\x1b[0m'
    ],
    'assertionMessage': 'Configuration error(s)'
  }
};

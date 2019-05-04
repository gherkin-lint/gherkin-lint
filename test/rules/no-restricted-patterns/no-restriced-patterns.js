var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-restricted-patterns.js');
var runTest = ruleTestBase.createRuleTest(rule, '<%= nodeType %> <%= property %>: "<%= string %>" matches restricted pattern "/<%= pattern %>/i"');

describe('No Restricted Patterns Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-restricted-patterns/NoViolations.feature', {
      'Global': [
        '^.*disallowed.*$'
      ]}, []);
  });

  it('detects errors in Feature names and descriptions that match the Feature or Global config', function() {
    var configuration = {
      'Feature': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    runTest('no-restricted-patterns/FeatureViolations.feature', configuration, [
      {
        messageElements: {
          string: 'Feature with disallowed patterns',
          pattern: '^.*disallowed.*$',
          nodeType:'Feature', 
          property: 'name'
        },
        line: 1
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'A restricted global pattern',
          nodeType:'Feature', 
          property: 'description'
        },
        line: 1
      },
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Feature', 
          property: 'description'
        },
        line: 1
      }
    ]);
  });

  it('detects errors in Background descriptions and steps that match the Background or Global config', function() {
    var configuration = {
      'Background': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    runTest('no-restricted-patterns/BackgroundViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Background', 
          property: 'description'
        },
        line: 4
      },
      {
        messageElements: {
          string: 'disallowed background step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step', 
          property: 'text'
        },
        line: 6
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step', 
          property: 'text'
        },
        line: 7
      }
    ]);
  });

  it('detects errors in Scenario names, descriptions and steps that match the Background or Global config', function() {
    var configuration = {
      'Scenario': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    runTest('no-restricted-patterns/ScenarioViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Scenario', 
          property: 'description'
        },
        line: 4
      },
      {
        messageElements: {
          string: 'Disallowed exact and partial matching',
          pattern: '^.*disallowed.*$',
          nodeType:'Scenario', 
          property: 'name'
        },
        line: 4
      },
      {
        messageElements: {
          string: 'disallowed scenario step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step', 
          property: 'text'
        },
        line: 6
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step', 
          property: 'text'
        },
        line: 7
      }
    ]);
  });

  it('detects errors in ScenarioOutline names, descriptions and steps that match the Background or Global config', function() {
    var configuration = {
      'ScenarioOutline': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    runTest('no-restricted-patterns/ScenarioOutlineViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'ScenarioOutline', 
          property: 'description'
        },
        line: 4
      },
      {
        messageElements: {
          string: 'Disallowed exact and partial matching',
          pattern: '^.*disallowed.*$',
          nodeType:'ScenarioOutline', 
          property: 'name'
        },
        line: 4
      },
      {
        messageElements: {
          string: 'disallowed scenario outline step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step', 
          property: 'text'
        },
        line: 6
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step', 
          property: 'text'
        },
        line: 7
      }
    ]);
  });


});

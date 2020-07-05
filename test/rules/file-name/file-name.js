var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/file-name.js');
var runTest = ruleTestBase.createRuleTest(rule, 'File names should be written in <%= style %> e.g. "<%= corrected %>"');

describe('File Name Rule', function() {
  describe('when set up for kebab-case', () => {
    it('doesn\'t raise errors when there are no violations', function() {
      return runTest('file-name/kebab-case.feature', {
        'style': 'kebab-case'
      }, []);
    });

    it('raises errors for a title cased file name', function() {
      return runTest('file-name/TitleCase.feature', {
        'style': 'kebab-case'
      }, [{
        messageElements: {style: 'kebab-case', corrected:'title-case.feature'},
        line: 0
      }]);
    });

    it('raises errors for a camel cased file name', function() {
      return runTest('file-name/camelCase.feature', {
        'style': 'kebab-case'
      }, [{
        messageElements: {style: 'kebab-case', corrected:'camel-case.feature'},
        line: 0
      }]);
    });

    it('raises errors for a snake cased file name', function() {
      return runTest('file-name/snake_case.feature', {
        'style': 'kebab-case'
      }, [{
        messageElements: {style: 'kebab-case', corrected:'snake-case.feature'},
        line: 0
      }]);
    });
  });

  describe('when set up for camelCase', () => {
    it('doesn\'t raise errors when there are no violations', function() {
      return runTest('file-name/camelCase.feature', {
        'style': 'camelCase'
      }, []);
    });

    it('raises errors for a title cased file name', function() {
      return runTest('file-name/TitleCase.feature', {
        'style': 'camelCase'
      }, [{
        messageElements: {style: 'camelCase', corrected:'titleCase.feature'},
        line: 0
      }]);
    });

    it('raises errors for a kebab cased file name', function() {
      return runTest('file-name/kebab-case.feature', {
        'style': 'camelCase'
      }, [{
        messageElements: {style: 'camelCase', corrected:'kebabCase.feature'},
        line: 0
      }]);
    });

    it('raises errors for a snake cased file name', function() {
      return runTest('file-name/snake_case.feature', {
        'style': 'camelCase'
      }, [{
        messageElements: {style: 'camelCase', corrected:'snakeCase.feature'},
        line: 0
      }]);
    });
  });

  describe('when set up for TitleCase', () => {
    it('doesn\'t raise errors when there are no violations', function() {
      return runTest('file-name/TitleCase.feature', {
        'style': 'TitleCase'
      }, []);
    });

    it('raises errors for a title cased file name', function() {
      return runTest('file-name/kebab-case.feature', {
        'style': 'TitleCase'
      }, [{
        messageElements: {style: 'TitleCase', corrected:'KebabCase.feature'},
        line: 0
      }]);
    });

    it('raises errors for a camel cased file name', function() {
      return runTest('file-name/camelCase.feature', {
        'style': 'TitleCase'
      }, [{
        messageElements: {style: 'TitleCase', corrected:'CamelCase.feature'},
        line: 0
      }]);
    });

    it('raises errors for a snake cased file name', function() {
      return runTest('file-name/snake_case.feature', {
        'style': 'TitleCase'
      }, [{
        messageElements: {style: 'TitleCase', corrected:'SnakeCase.feature'},
        line: 0
      }]);
    });
  });

  describe('when set up for snake_case', () => {
    it('doesn\'t raise errors when there are no violations', function() {
      return runTest('file-name/snake_case.feature', {
        'style': 'snake_case'
      }, []);
    });

    it('raises errors for a title cased file name', function() {
      return runTest('file-name/TitleCase.feature', {
        'style': 'snake_case'
      }, [{
        messageElements: {style: 'snake_case', corrected:'title_case.feature'},
        line: 0
      }]);
    });

    it('raises errors for a camel cased file name', function() {
      return runTest('file-name/camelCase.feature', {
        'style': 'snake_case'
      }, [{
        messageElements: {style: 'snake_case', corrected:'camel_case.feature'},
        line: 0
      }]);
    });

    it('raises errors for a snake cased file name', function() {
      return runTest('file-name/kebab-case.feature', {
        'style': 'snake_case'
      }, [{
        messageElements: {style: 'snake_case', corrected:'kebab_case.feature'},
        line: 0
      }]);
    });
  });
});

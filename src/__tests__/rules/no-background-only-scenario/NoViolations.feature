@featuretag
Feature: Feature with multiple tags

Background:
  Given I have a Background

@scenariotag
Scenario: This is a Scenario with multiple tags
  Then this is a then step

@scenariotag
Scenario Outline: This is a Scenario Outline with multiple tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

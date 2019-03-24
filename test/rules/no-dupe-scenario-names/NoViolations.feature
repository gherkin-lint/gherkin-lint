@featuretag1 @featuretag2
Feature: Feature with no dupe scenarios

Background:
  Given I have a Background

Scenario: This is a Scenario with a name
  Then this is a then step

Scenario Outline: This is a Scenario Outline with another name
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

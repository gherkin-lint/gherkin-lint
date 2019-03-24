Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

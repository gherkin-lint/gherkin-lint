Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag
Scenario: This is a Scenario
  Then this is a then step

@scenariotag1
Scenario Outline: This is a Scenario Outline
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

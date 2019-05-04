Feature: second feature

Background: Background name
  Given I have a Background

Scenario: This is a Scenario name
  Then this is a then step

Scenario Outline: This is another Scenario name
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

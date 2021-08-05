Feature: This is a Feature with non unique scenario names

Background:
  Given I have a Background

Scenario: This is a non unique name
  Then this is a then step

Scenario Outline: This is a non unique name
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

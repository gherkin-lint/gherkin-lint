Feature: This is a Feature with unique scenario names across files

Background:
  Given I have a Background

Scenario: This is a Scenario with a unique name across files
  Then this is a then step

Scenario Outline: This is a Scenario Outline with a unique name across files
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

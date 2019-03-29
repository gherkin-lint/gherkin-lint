
Feature: Feature with a name

Background:
  Given I have a Background

Scenario: This is a Scenario with a name
  Then this is a then step

Scenario Outline: This is a Scenario Outline with another name
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

Feature: Feature

Background:
  Given I have a Background

Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

Scenario Outline: This is a Scenario Outline with two examples
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

Scenario Outline: This is a Scenario Outline with one example
  Then this is a then step <foo>
Examples:
  | fizz |
  | buzz |
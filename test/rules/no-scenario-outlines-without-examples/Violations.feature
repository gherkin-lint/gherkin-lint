Feature: Feature

Background:
  Given I have a Background

Scenario: This is not a Scenario Outline
  Then this is a then step

Scenario Outline: This is a Scenario Outline without examples
  Then this is a then step <foo>

Scenario Outline: This is a Scenario Outline has Examples keyword but not examples
  Then this is a then step <foo>
Examples:

Scenario Outline: This is a Scenario Outline has table example with header but not rows
  Then this is a then step <foo>
Examples:
  | length |

Scenario Outline: This is a Scenario Outline with one example
  Then this is a then step <foo>
Examples:
  | length |
  | 2      |

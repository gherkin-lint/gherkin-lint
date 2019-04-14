Feature: Feature

Background:
  Given I have a Background

Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

Scenario Outline: This is a Scenario Outline with two examples
  Then this is a then step <length>
Examples:
  | length |
  | 1      |
  | 2      |

Scenario Outline: This is a Scenario Outline with one example
  Then this is a then step <length>
Examples:
  | length |
  | 1      |

Scenario Outline: Despite some Examples does not have examples, this is a Scenario Outline with one example. 
  Then this is a then step <length>
@length_zero
Examples:
@length_one
Examples:
  | length |
  | 1      |
@length_greater
Examples:
  | length |
Feature: Feature with scenario outline with unused variables

Scenario Outline: This is a Scenario Outline with a step variable that doesn't exist in the examples table
  Given this is step <a>
  And this is step <b>

Examples:
  | a |
  | 1 |


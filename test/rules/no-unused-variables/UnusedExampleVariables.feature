Feature: Feature with scenario outline with unused variables

Scenario Outline: This is a Scenario Outline with an example variable that's not used in a step
  Given this is step <a>

Examples:
  | a | b |
  | 1 | 2 |


Scenario Outline: This is a Scenario Outline with multiple examples, one of which contains and unsed variable
  Given this is step <a>

Examples:
  | a |
  | 1 |

Examples:
  | b |
  | 2 |

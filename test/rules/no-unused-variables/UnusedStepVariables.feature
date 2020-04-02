Feature: Feature with scenario outline with unused variables

Scenario: This is a Scenario with a step variable that doesn't exist in the examples table
  Given this is step <a>
  And this is step <b>
  Examples:
    | a |
    | 1 |

Scenario Outline: This is a Scenario Outline with a step variable that doesn't exist in the examples table
  Given this is step <a>
  And this is step <b>
  Examples:
    | a |
    | 1 |


Scenario Outline: This is a Scenario Outline with a variable that doesn't exist in the examples table <a> <b>
  Given this
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |


Scenario Outline: Examples variable is in a step table
  Given this:
    | <a> |s
    | <b> |
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |


Scenario Outline: Examples variable is in a step string
  Given this
  When I do that
  Then this should display:
    """
      <a><b>
    """
  Examples:
    | a |
    | 1 |

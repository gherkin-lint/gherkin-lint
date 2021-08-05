Feature: Feature with scenario outline with unused variables

Scenario: This is a Scenario with an example variable that's not used in a step
  Given this is step <a>

  Examples:
    | a | b |
    | 1 | 2 |

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


Scenario Outline: This is a Scenario Outline with a variable that doesn't use all the examples table vars <a>
  Given this
  When I do that
  Then something should happen
  Examples:
    | a | b |
    | 1 | 2 |


Scenario Outline: Examples variable is in a step table
  Given this:
    | <a> |
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |

  Examples:
    | b |
    | 2 |


Scenario Outline: Examples variable is in a step string
  Given this
  When I do that
  Then this should display:
    """
      <a>
    """
  Examples:
    | a | b |
    | 1 | 2 |

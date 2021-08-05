Feature: Feature with scenario outline

Background:
  Given I have a background step with a word that looks like a <variable> even though it's not, because this is not a scenario outline step
  Then I shouldn't get an unused variable error

Scenario:
  Given I have a scenario step with a word that looks like a <variable> even though it's not, because there's no examples table
  Then I shouldn't get an unused variable error

Scenario:
  Given I have a scenario step with a word that looks like a <a>
  Then I shouldn get an unused variable error cause

  Examples:
    | a |
    | 1 |

Scenario Outline: This is a Scenario Outline
  Given this is step <a>

  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable <a> is in the scenario name
  Given this
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable is in a step table
  Given this:
    | <a> |
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
      <a>
    """
  Examples:
    | a |
    | 1 |

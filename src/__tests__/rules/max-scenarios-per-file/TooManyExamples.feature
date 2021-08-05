Feature: Feature with more than max number of scenarios

  Scenario Outline: This is a Scenario Outline with too many examples
    Then this is a then step <foo>
    Examples:
      | title |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |
      | foo   |

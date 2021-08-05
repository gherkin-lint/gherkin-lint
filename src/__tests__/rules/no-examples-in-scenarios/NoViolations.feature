Feature: A feature

Background:
    Given I have a background step

Scenario: A scenario with no examples
    Then I don't get an error

Scenario Outline: A scenario outline with an example
    Given variable <a>
    Then I don't get an error

    Examples:
        |a|
        |1|

Scenario Outline: A scenario outline with no examples
    Then I don't get an error

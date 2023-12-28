Feature: Test for the no-empty-lines-after-examples

Scenario Outline: This is a Scenario for no-empty-lines-after-examples
  Given I have a feature file with empty line after "<sectionName>" section
  Then I should see no-empty-lines-after-examples error
  Examples:

    | sectionName |
    | Examples    |


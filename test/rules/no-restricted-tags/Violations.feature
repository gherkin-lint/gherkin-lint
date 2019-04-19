@featuretag @featuretag1 @anothertag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @scenariotag1 @scenariotag2 @anothertag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @scenariotag1
Scenario Outline: This is a Scenario Outline without tag examples
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

Scenario Outline: This is a Scenario Outline with forbidden example tags
  Then this is a then step <foo>
@exampletag1
Examples:
  | foo  |
  | fizz |
@exampletag2
Examples:
  | bar  |
  | buzz |

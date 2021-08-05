@featuretag @featuretag1 @anothertag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @scenariotag1 @scenariotag2 @anothertag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @scenariotag1
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
@examplestag @examplestag1
Examples:
  | foo |
  | bar |

Examples:
  | foo  |
  | bar1 |

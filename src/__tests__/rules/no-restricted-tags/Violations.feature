@featuretag @badTag @anotherBadTag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @badTag @anotherBadTag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @badTag @anotherBadTag
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
@examplestag @badTag @anotherBadTag
Examples:
  | foo |
  | bar |

@examplestag @badTag @anotherBadTag
Examples:
  | foo |
  | bar |

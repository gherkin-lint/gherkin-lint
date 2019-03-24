@featuretag1 @featuretag2
Feature: Feature with no dupe scenarios

Background:
  Given I have a Background

Scenario: This is a Scenario
  Then this is a then step

Scenario Outline: This is a Scenario
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

Scenario: This is a Scenario
  Then this is another then step

Scenario: This is a Scenario
  Then this is a different then step

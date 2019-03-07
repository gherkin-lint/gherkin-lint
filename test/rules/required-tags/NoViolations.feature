@featuretag
Feature: Feature with all of the required tags present

Background:
  Given I have a Background

@requiredscenariotag @required-scenario-tag @required-scenario-tag-1234
Scenario: This is a Scenario with all of the required tags present
  Then this is a then step

@requiredscenariotag @required-scenario-tag @required-scenario-tag-5678
Scenario Outline: This is a Scenario Outline with all of the required tags present
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |
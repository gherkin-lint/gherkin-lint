@featuretag
Feature: Feature with some of the required tags missing

Background:
  Given I have a Background

@requiredscenariotag @required-scenario-tag-ABCD-1234
Scenario: This is a Scenario with some of the required tags missing
  Then this is a then step

@requiredscenariotag @required-scenario-tag-ABCD-1234
Scenario Outline: This is a Scenario Outline with some of the required tags missing
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |
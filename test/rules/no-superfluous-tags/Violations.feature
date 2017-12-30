@superfluoustag1 @superfluoustag2 @featuretag
Feature: Feature with multiple superfluous tags

Background:
  Given I have a Background

@superfluoustag1 @scenariotag1 @scenariotag2
Scenario: This is a Scenario with superfluous tags
  Then this is a then step

@superfluoustag1 @superfluoustag2 @scenariotag1 @scenariotag3
Scenario Outline: This is a Scenario Outline with superfluous tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

@featuretag1  @featuretag2
@featuretag3
Feature: Feature with good tag spacing

Background:
  Given I have a Background

@scenariotag1 @scenariotag2
@scenariotag3   @scenariotag4  @scenariotag5
Scenario: This is a Scenario with bad tag spacing
  Then this is a then step

@scenariotag5   @scenariotag6
Scenario Outline: This is a Scenario Outline with bad tag spacing
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

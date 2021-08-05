@featureTag1 @featureTag2 @featuretag3
Feature: Test for correct indentation - tabs

Background:
		Given I have a Feature file with great indentation

@scenarioTag1 @scenarioTag2
@scenarioTag3
Scenario: This is a Scenario with correct indentation - tabs
		Then I should not see an indentation error

@scenarioTag1 @scenarioTag2
@scenarioTag3
Scenario Outline: This is a Scenario Outline with correct indentation - tabs
		Then I should not see an indentation error <foo> <bar>
Examples:
		| foo | bar |
		| bar | foo |
		| har | har |

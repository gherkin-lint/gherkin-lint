@tag
Feature: Test for the no-partially-commented-tag-lines

Background:
  Given I have a Feature file

@tag
Scenario: This is a Scenario
  Then this is a step


@tag
Scenario Outline: This is a Scenario outline
  Then this is a step
  Examples:
  	|foo|
  	|bar|

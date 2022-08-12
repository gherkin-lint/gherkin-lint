@tag
Feature: Feature with Scenario outline

Background:
  Given I have a Feature file

@tag
Scenario Outline: This is a Scenario outline
  Then this is a step
  Examples:
  	|foo|
  	|bar|
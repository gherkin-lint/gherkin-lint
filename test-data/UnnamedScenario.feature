Feature: Test for the no-unamed-scenarios rule

Scenario:
  Given I have an unamed Scenario
  Then I should see a no-unamed-scenarios error

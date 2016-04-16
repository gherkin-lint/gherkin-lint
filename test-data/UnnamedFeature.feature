Feature:

Scenario: Test for the no-unamed-features rule
  Given I have an unamed Feature
  Then I should see a no-unamed-features error

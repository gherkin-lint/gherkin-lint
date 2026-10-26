Feature: Duplicate scenario names under the same Rule

  Rule: Users Tab

    Scenario: Activate user
      Given an inactive user is displayed
      When the activate toggle is clicked
      Then the user is activated

    Scenario: Activate user
      Given another inactive user is displayed
      When the activate toggle is clicked
      Then the user is activated

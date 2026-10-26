Feature: Backgrounds are scoped to Features and Rules
  Background:
    Given a feature-level precondition

  Rule: First business rule
    Background:
      Given a first rule precondition

    Scenario: First scenario
      Then the first rule applies

  Rule: Second business rule
    Background:
      Given a second rule precondition

    Scenario: Second scenario
      Then the second rule applies

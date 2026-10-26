Feature: Same scenario names under different Rules

  Rule: Users Tab

    Scenario: [Pagination] Clicking the Next and Previous page buttons
      Given the users table is displayed
      When the next page button is clicked
      Then the next page of users is shown

    Scenario: [Pagination] Update total table entries
      Given the users table is displayed
      When a new page size is selected
      Then the users table updates

  Rule: Companies Tab

    Scenario: [Pagination] Clicking the Next and Previous page buttons
      Given the companies table is displayed
      When the next page button is clicked
      Then the next page of companies is shown

    Scenario: [Pagination] Update total table entries
      Given the companies table is displayed
      When a new page size is selected
      Then the companies table updates

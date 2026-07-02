Feature: Data Table

  The data table connects to the local VUU data provider and
  displays instruments data from the SIMUL module.

  Scenario: Table renders column headers
    Given the data table is rendered
    Then the table has a column header "ric"
    And the table has a column header "description"
    And the table has a column header "currency"
    And the table has a column header "exchange"

import React from "react";
import { Given, Then } from "@cucumber/cucumber";
import { render, screen } from "@testing-library/react";
import { LocalDataSourceProvider } from "@vuu-ui/vuu-data-test";
import { DataTable } from "../../src/DataTable";

Given("the data table is rendered", function () {
  render(
    <LocalDataSourceProvider>
      <DataTable />
    </LocalDataSourceProvider>
  );
});

Then(
  "the table has a column header {string}",
  function (expectedHeader: string) {
    screen.getByText(expectedHeader);
  }
);

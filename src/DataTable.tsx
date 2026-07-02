import { useMemo } from "react";
import { useData } from "@vuu-ui/vuu-utils";
import { Table } from "@vuu-ui/vuu-table";
import type { TableConfig } from "@vuu-ui/vuu-table-types";
import "./DataTable.css"

const config: TableConfig = {
  columns: [
    { name: "ric", width: 150 },
    { name: "description", width: 300 },
    { name: "currency", width: 80 },
    { name: "exchange", width: 100 },
  ],
};

export function DataTable() {
  const { VuuDataSource } = useData();
  const dataSource = useMemo(
    () =>
      new VuuDataSource({
        columns: ["ric", "description", "currency", "exchange"],
        table: { module: "SIMUL", table: "instruments" },
      }),
    [VuuDataSource]
  );

  return (
    <Table
      config={config}
      className='testTable'
      dataSource={dataSource}
      rowHeight={20}
      viewportRowLimit={10}
    />
  );
}

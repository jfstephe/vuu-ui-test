import { LocalDataSourceProvider } from "@vuu-ui/vuu-data-test";
import { DataTable } from "./DataTable";

export default function App() {
  return (
    <LocalDataSourceProvider>
      <DataTable />
    </LocalDataSourceProvider>
  );
}

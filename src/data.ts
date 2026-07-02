import { TickingArrayDataSource } from "@vuu-ui/vuu-data-test";

export const COLUMNS = ["id", "name"] as const;

export const columnDescriptors = [
  { name: "id", serverDataType: "string" as const },
  { name: "name", serverDataType: "string" as const },
];

export const initialData = [
  ["1", "Alice"],
  ["2", "Bob"],
];

export function createDataSource() {
  return new TickingArrayDataSource({
    columnDescriptors,
    data: initialData,
    keyColumn: "id",
  });
}

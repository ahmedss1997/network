import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable, DataTableProps } from "./components/data-table";
import { data } from "./data";
import { ColumnDef } from "@tanstack/react-table";

export default function AdvancedTable({data, columns, searchBy, statuses}: DataTableProps<any>) {
  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
        searchBy={searchBy}
        statuses={statuses}
      />
    </Fragment>
  );
}

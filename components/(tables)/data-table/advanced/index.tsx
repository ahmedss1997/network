import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { data } from "./data";
import { ColumnDef } from "@tanstack/react-table";

export default function AdvancedTable({data, columns, searchBy}: {data:any[], columns: ColumnDef<any>[], searchBy: string}) {
  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
        searchBy={searchBy}
      />
    </Fragment>
  );
}

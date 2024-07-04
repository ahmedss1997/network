"use client";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
export function DataTableToolbar({ table, searchBy }: {table: Table<any>, searchBy: string}) {
  const table1 = table;
  const isFiltered = table1.getState().columnFilters.length > 0;
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table1.getColumn(searchBy)?.setFilterValue(value);
  };
  const statusColumn = table1.getColumn("status");
  const priorityColumn = table1.getColumn("priority");

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Filter..."
        value={table1.getColumn(searchBy)?.getFilterValue() as string || ""}
        onChange={handleFilterChange}
        className="h-8 min-w-[200px] max-w-sm"
      />

      {statusColumn && (
        <DataTableFacetedFilter
          column={statusColumn}
          title="Status"
          options={statuses}
        />
      )}
      {priorityColumn && (
        <DataTableFacetedFilter
          column={priorityColumn}
          title="Priority"
          options={priorities}
        />
      )}
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table1.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions table={table1} />
    </div>

  );
}

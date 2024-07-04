"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import {users} from "@/api/users/data";
import { iUser } from "@/models/data-models";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/(tables)/data-table/advanced/components/data-table-column-header";
import { Button } from "@/components/ui/button";
export default function UsersLists() {
    const columns: ColumnDef<iUser>[] = [
        {
          accessorKey: "username",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User Name" />
          ),
          cell: ({ row }) => <div>{row.getValue("username")}</div>,
          enableSorting: true,
          enableHiding: false,
        },
        {
          accessorKey: "balance",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Balance" />
          ),
          cell: ({ row }) => <div className="text-start">{row.getValue("balance")}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "id",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="actions" />
          ),
          cell: ({ row }) => <div>
            <Button  color="destructive" size="sm">
                Try again
            </Button>
          </div>,
          enableSorting: false,
          enableHiding: false,
        },
      ];
    return (
    <div className="bg-background py-6 px-3 rounded">
        <AdvancedTable data={users} columns={columns} searchBy="username" />
    </div>
    );
}
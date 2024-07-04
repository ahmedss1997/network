"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import {users} from "@/app/api/users/data";
import { iUser } from "@/models/data-models";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/(tables)/data-table/advanced/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Option } from "@/components/(tables)/data-table/advanced/components/data-table-faceted-filter";
import {Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
export default function UsersLists() {
    const computedUsers = users.map(x => {
      const status = x.status.status ? "Active" : "Expired";
      return {...x, status: status}
    })
    const statuses:Option[]  = [
      {
        value: 'Active',
        label: "Active",
      },
      {
        value: 'Expired',
        label: "Expired",
      }
    ];
    const columns: ColumnDef<iUser>[] = [
        {
          accessorKey: "status",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
          ),
          cell: ({ row }) => {
            const status = row.getValue("status");
             return (<div className={`w-4 h-4 ${status == "Active" ? "bg-success" : "bg-warning"}`}></div>)
          },
          enableSorting: true,
          enableHiding: false,
        },
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
          accessorKey: "firstname",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First Name" />
          ),
          cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "lastname",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Name" />
          ),
          cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "expiration",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Expiration" />
          ),
          cell: ({ row }) => <div>{row.getValue("expiration")}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "parent_username",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Parent" />
          ),
          cell: ({ row }) => <div className="text-start">{row.getValue("parent_username")}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "profile_details",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Profile" />
          ),
          cell: ({ row }) => {
            const name = (row.getValue("profile_details") as any).name;
             return (<div>{name}</div>)
          },
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "loan_balance",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Debts" />
          ),
          cell: ({ row }) => <div className="text-start">{row.getValue("loan_balance") || 0} $</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "daily_traffic_details",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Daily Traffic" />
          ),
          cell: ({ row }) => <div className="text-start">{row.getValue("daily_traffic_details") || 0}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "remaining_days",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Remaining Days" />
          ),
          cell: ({ row }) => <div className="text-start">{row.getValue("remaining_days") || 0}</div>,
          enableSorting: true,
          enableHiding: true,
        },
        {
          accessorKey: "id",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="actions" />
          ),
          cell: ({  }) => (<div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="align-start w-[150px] bg-background shadow-lg border py-3">
                <DropdownMenuLabel>Edit</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Edit</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>),
          enableSorting: false,
          enableHiding: false,
        },
      ];
    return (
    <div className="bg-background py-6 px-3 rounded">
        <AdvancedTable data={computedUsers} columns={columns} searchBy="username" statuses={statuses} />
    </div>
    );
}
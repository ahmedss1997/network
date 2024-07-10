"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import {users} from "@/app/api/users/data";
import { iUser } from "@/models/data-models";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/(tables)/data-table/advanced/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Option } from "@/components/(tables)/data-table/advanced/components/data-table-faceted-filter";
import {EyeIcon, Menu, PencilIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteEventAction } from "@/action/calendar-action";
export default function UsersLists() {
    const computedUsers = users.map(x => {
      const status = x.status.status ? "Active" : "Expired";
      return {...x, status: status}
    }).slice(0, 2);
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
        cell: ({row}) => (<div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-start w-[120px] bg-background shadow-lg border p-3 m-3">
              <DropdownMenuLabel className="flex items-center" role="button">
                <EyeIcon className="w-3 h-3 ltr:mr-2 rtl:ml-2" /> <span>View</span> 
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel className="flex items-center" role="button">
                <PencilIcon className="w-3 h-3 ltr:mr-2 rtl:ml-2" /> <span>Edit</span> 
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel className="flex items-center" role="button" onClick={() => handleOpenDeleteModal(row.getValue("id"))}>
                <TrashIcon className="w-3 h-3 ltr:mr-2 rtl:ml-2" /> <span>Delete</span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>),
        enableSorting: false,
        enableHiding: false,
      },
    ];
    // delete modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
    const onDeleteEventAction = async () => {
      try {
        if (!eventIdToDelete) {
          toast.error("Event ID not found");
          return;
        }
  
        const response = await deleteEventAction(eventIdToDelete);
        if (response?.status === "success") {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };  
      
    const handleOpenDeleteModal = (eventId: string) => {
      setEventIdToDelete(eventId);
      setDeleteModalOpen(true);
    };
    return (
    <div className="bg-background py-6 px-3 rounded">
        <AdvancedTable data={computedUsers} columns={columns} searchBy="username" statuses={statuses} />
        <DeleteConfirmationDialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={onDeleteEventAction}
          defaultToast={false}
        />
    </div>
    );
}
"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import { managers } from "@/app/api/users/data";
import { Managers } from "@/models/data-models";
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
    const computedManagers = managers;
    const columns: ColumnDef<Managers>[] = [
      {
        accessorKey: "username",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="username" />
        ),
        cell: ({ row }) => <div>{row.getValue("username")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "firstname",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="firstname" />
        ),
        cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "lastname",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="lastname" />
        ),
        cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "Balance",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Balance" />
        ),
        cell: ({ row }) => <div>{row.getValue("Balance")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "Debts",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Debts" />
        ),
        cell: ({ row }) => <div>{row.getValue("Debts")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "Permissions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Permissions" />
        ),
        cell: ({ row }) => <div>{row.getValue("Permissions")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "Parent",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Parent" />
        ),
        cell: ({ row }) => <div>{row.getValue("Parent")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "Users",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Users" />
        ),
        cell: ({ row }) => <div>{row.getValue("Users")}</div>,
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
        <AdvancedTable data={computedManagers} columns={columns} searchBy="username" statuses={[]} />
        <DeleteConfirmationDialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={onDeleteEventAction}
          defaultToast={false}
        />
    </div>
    );
}
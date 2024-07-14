"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import { groups } from "@/app/api/users/data";
import { Groups } from "@/models/data-models";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/(tables)/data-table/advanced/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import {Menu, PencilIcon, Plus, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteEventAction } from "@/action/calendar-action";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { UsersActionsButton } from "../users/actionsButton";
export default function UsersLists() {
    const computedGroups = groups;
    const columns: ColumnDef<Groups>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "Name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div>{row.getValue("Name")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "Description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => <div>{row.getValue("Description")}</div>,
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
        enableHiding: false,
      },
      {
        accessorKey: "Managers",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Managers" />
        ),
        cell: ({ row }) => <div>{row.getValue("Managers")}</div>,
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
                <Link href='/groups/newsGroup' className="flex items-center">
                  <Plus className="w-4 h-4 ltr:mr-2 rtl:ml-2" /> <span> New </span> 
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel className="flex items-center" role="button">
                <PencilIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" /> <span>Edit</span> 
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel className="flex items-center" role="button" onClick={() => handleOpenDeleteModal(row.getValue("id"))}>
                <TrashIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" /> <span>Delete</span>
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
      <div className="text-center lg:text-start mb-6">
        <UsersActionsButton title={"actions"} />
      </div>
      <AdvancedTable data={computedGroups} columns={columns} searchBy="username" statuses={[]} />
      <DeleteConfirmationDialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDeleteEventAction}
        defaultToast={false}
      />
    </div>
    );
}
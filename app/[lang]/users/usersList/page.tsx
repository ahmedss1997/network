"use client";
import AdvancedTable from "@/components/(tables)/data-table/advanced";
import {users} from "@/app/api/users/data";
import { iUser } from "@/models/data-models";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/(tables)/data-table/advanced/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Option } from "@/components/(tables)/data-table/advanced/components/data-table-faceted-filter";
import {EyeIcon, Menu, PencilIcon, TrashIcon, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteEventAction } from "@/action/calendar-action";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UsersActionsButton } from "../actionsButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function UsersLists() {
    const computedUsers = users.map(x => {
      const status = x.status.status ? "Active" : "Expired";
      return {...x, status: status}
    });
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
                <Link href='/users/newUser' className="flex items-center">
                <Plus className="w-3 h-3 ltr:mr-2 rtl:ml-2" /> <span> New </span> 
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel role="button">
                <DialogTrigger asChild>
                  <div role="button"
                    className="flex items-center"
                    onClick={() => setRenameModalOpen(true)}
                  >
                    <EyeIcon className="w-3 h-3 ltr:mr-2 rtl:ml-2" /> <span>Rename</span> 
                  </div>
                </DialogTrigger>
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
    const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
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
      <Dialog>
      {
        renameModalOpen ?
        <DialogContent size="2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            Create a New Account
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="h-[200px]">
            <ScrollArea className="h-full">
              <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                <div className="flex flex-col gap-2">
                  <Label>First Name</Label>
                  <Input type="text" placeholder="Enter first name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name</Label>
                  <Input type="text" placeholder="Enter last name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Set Password</Label>
                  <Input type="number" placeholder="Your phone number" />
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className=" flex justify-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button">Submit </Button>
          </div>
        </div>
      </DialogContent>
        : <></>
      }
      
      <div className="text-center lg:text-start mb-6">
        <DialogTrigger asChild>
          <UsersActionsButton title={"actions"} />
        </DialogTrigger>
      </div>
      <AdvancedTable data={computedUsers} columns={columns} searchBy="username" statuses={statuses} />
      <DeleteConfirmationDialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDeleteEventAction}
        defaultToast={false}
      />
      </Dialog>
    </div>
    );
}
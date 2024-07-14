import * as React from "react";
import { PencilIcon, Plus, PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function UsersActionsButton({title}: {title: string}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <PlusCircle className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ul className="">
          <li className="flex items-center mb-1 py-1 px-2 cursor-pointer hover:bg-slate-200">
            <Plus className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            <span className="mx-2">New</span>
          </li>
          <li className="flex items-center mb-1 py-1 px-2 cursor-pointer hover:bg-slate-200">
            <PencilIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            <span className="mx-2">Rename</span>
          </li>
          <li className="flex items-center mb-1 py-1 px-2 cursor-pointer hover:bg-slate-200">
            <TrashIcon className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            <span className="mx-2">Delete</span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

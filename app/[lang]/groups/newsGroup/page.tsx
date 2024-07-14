"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from '@iconify/react';
import { Users } from "lucide-react";
const VFormWithIcon = () => {
  return (
    <div className="mt-5">
      <div className="flex w-full bg-primary text-white py-3 px-4 rounded-t-lg">
        <Users />
        <span className="mx-3">Group Name</span>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-4 bg-white rounded-b-lg py-6 px-4">
          <div className="col-span-2  flex flex-col gap-2 mb-2">
            <Label htmlFor="viFullName3" className="mb-1">Group Name</Label>
            <InputGroup merged>
              <InputGroupText>
                <Icon icon="mdi:user" />
              </InputGroupText>
              <Input type="text" placeholder="Your name group" id="viFullName3" />
            </InputGroup>
          </div>
          <div className="col-span-2  flex flex-col gap-2 mb-2">
            <Label htmlFor="viEmail3" className="mb-1">Description</Label>
            <InputGroup merged>
              <InputGroupText>
                <Icon icon="ic:outline-email" />
              </InputGroupText>
              <Input type="email" placeholder="Your Description" id="viEmail3" />
            </InputGroup>
          </div>
          <div className="col-span-2 mt-3">
            <Button type="submit" className="">Submit</Button>
            <Button type="submit" className="mx-5">Dismiss</Button>
          </div>
        </div>
      </form>
    </div>
    
  );
};

export default VFormWithIcon;
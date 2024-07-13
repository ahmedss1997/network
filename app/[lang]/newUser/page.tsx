"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button'
import { User } from "lucide-react";
import DefaultSwitch  from "@/components/(forms)/switch/default-switch";
const VFormWithLabel = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center w-full bg-primary text-white py-3 px-4 rounded-t-lg">
        <User />
        <span className="mx-3">User Form</span>
      </div>
      <div className="bg-white rounded-b-lg py-6 px-4">
        <h2 className="border-b border-gray-300 py-3 mb-8">Basic Information</h2>
        <form>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName5" className="mb-1">Username</Label>
              <Input type="text" placeholder="Your Username" id="username5" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName5" className="mb-1">Enabled</Label>
              <DefaultSwitch  />
            </div>
            {/*  */}
            <div className=" flex flex-col gap-2">
              <Label htmlFor="password5">Password</Label>
              <Input type="Password" placeholder="type password" id="password5" />
            </div>
            <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
              <Label htmlFor="confirmPassword5">Confirm Password</Label>
              <Input type="Password" placeholder="Confirm password" id="confirmPassword5" />
            </div>
            <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
              <Label htmlFor="phoneNumber5">Phone Number</Label>
              <Input type="number" placeholder="Your Number" id="phoneNumber5" />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="state">State</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="british">British Columbia</SelectItem>
                  <SelectItem value="manitoba">Manitoba</SelectItem>
                  <SelectItem value="brunswick">New Brunswick</SelectItem>
                  <SelectItem value="ontario">Ontario</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
              <Label htmlFor="zipCode5">Zip Code</Label>
              <Input type="number" placeholder="Type Code" id="zipCode5" />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-1.5">
                <Checkbox id="term3" size="sm" color="default" />
                <Label
                  htmlFor="term3"
                  className="text-base text-muted-foreground font-normal"
                >
                  Agree to terms and conditions
                </Label>
              </div>
            </div>
            <div className="col-span-2">
              <Button type="submit">Submit Form</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VFormWithLabel;
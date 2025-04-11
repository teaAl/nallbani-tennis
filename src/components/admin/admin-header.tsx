"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CustomDropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const router = useRouter();

  return (
    <header className="bg-pana/90 shadow-md h-16 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <button>
          <Bell className="h-5 w-5 text-gray-800 cursor-pointer" />
        </button>
        {/* <CustomDropdown
          align="right"
          trigger={
            <button>
              <User className="h-5 w-5" />
            </button>
          }
        >
          <DropdownLabel>Coach Account</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => router.push("/settings")}>
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Logout</DropdownItem>
        </CustomDropdown> */}
      </div>
    </header>
  );
}

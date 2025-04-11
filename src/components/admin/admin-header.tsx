"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomDropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <Button variant="default" size="sm">
          <Bell className="h-5 w-5" />
        </Button>
        <CustomDropdown
          align="right"
          trigger={
            <Button variant="default" size="sm">
              <User className="h-5 w-5" />
            </Button>
          }
        >
          <DropdownLabel>Coach Account</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem onClick={() => router.push("/profile")}>Profile</DropdownItem>
          <DropdownItem onClick={() => router.push("/settings")}>Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Logout</DropdownItem>
        </CustomDropdown>
      </div>
    </header>
  )
}

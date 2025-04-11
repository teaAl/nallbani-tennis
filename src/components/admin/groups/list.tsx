"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"

interface GroupsListProps {
  onViewGroup?: (id: string) => void
}

export function GroupsList({ onViewGroup }: GroupsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // In a real app, this data would come from your API
  const groups = [
    {
      id: "1",
      name: "Beginner Kids",
      level: "Beginner",
      members: 8,
      maxMembers: 10,
      schedule: "Mon, Wed 4:00 PM",
    },
    {
      id: "2",
      name: "Intermediate Adults",
      level: "Intermediate",
      members: 6,
      maxMembers: 8,
      schedule: "Tue, Thu 6:00 PM",
    },
    {
      id: "3",
      name: "Advanced Teens",
      level: "Advanced",
      members: 4,
      maxMembers: 6,
      schedule: "Fri 5:00 PM, Sat 10:00 AM",
    },
    {
      id: "4",
      name: "Senior Beginners",
      level: "Beginner",
      members: 5,
      maxMembers: 8,
      schedule: "Mon, Wed 10:00 AM",
    },
  ]

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.level.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search groups..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">
                  <button className="hover:underline text-left" onClick={() => onViewGroup?.(group.id)}>
                    {group.name}
                  </button>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{group.level}</Badge>
                </TableCell>
                <TableCell>
                  {group.members}/{group.maxMembers}
                </TableCell>
                <TableCell>{group.schedule}</TableCell>
                <TableCell>
                  <CustomDropdown
                    align="right"
                    trigger={
                      <Button variant="default" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  >
                    <DropdownItem onClick={() => onViewGroup?.(group.id)}>View Details</DropdownItem>
                    <DropdownItem>Edit Group</DropdownItem>
                    <DropdownItem className="text-red-600">Delete Group</DropdownItem>
                  </CustomDropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

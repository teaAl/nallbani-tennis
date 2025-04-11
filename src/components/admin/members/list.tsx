"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"

interface MembersListProps {
  onViewMember?: (id: string) => void
}

export function MembersList({ onViewMember }: MembersListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // In a real app, this data would come from your API
  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      level: "Intermediate",
      joinedOn: "Mar 15, 2023",
      image: "",
    },
    {
      id: "2",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 567-8901",
      level: "Advanced",
      joinedOn: "Apr 2, 2023",
      image: "",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+1 (555) 678-9012",
      level: "Beginner",
      joinedOn: "Apr 20, 2023",
      image: "",
    },
    {
      id: "4",
      name: "Alex Kim",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      level: "Intermediate",
      joinedOn: "Jan 20, 2023",
      image: "",
    },
    {
      id: "5",
      name: "Maria Lopez",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      level: "Beginner",
      joinedOn: "Feb 5, 2023",
      image: "",
    },
    {
      id: "6",
      name: "John Davis",
      email: "john@example.com",
      phone: "+1 (555) 345-6789",
      level: "Advanced",
      joinedOn: "Feb 10, 2023",
      image: "",
    },
  ]

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.level.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search members..."
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
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <button className="font-medium hover:underline text-left" onClick={() => onViewMember?.(member.id)}>
                      {member.name}
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{member.email}</div>
                    <div className="text-sm text-gray-500">{member.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{member.level}</Badge>
                </TableCell>
                <TableCell>{member.joinedOn}</TableCell>
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
                    <DropdownItem onClick={() => onViewMember?.(member.id)}>View Profile</DropdownItem>
                    <DropdownItem>Edit Member</DropdownItem>
                    <DropdownItem>Schedule Lesson</DropdownItem>
                    <DropdownItem className="text-red-600">Deactivate Member</DropdownItem>
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

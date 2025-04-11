"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, X } from "lucide-react"

interface GroupMembersProps {
  groupId: string
}

export function GroupMembers({ groupId }: GroupMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // In a real app, this data would come from your API based on the groupId
  const members = [
    {
      id: "1",
      name: "Alex Kim",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      joinedOn: "Jan 20, 2023",
      image: "",
    },
    {
      id: "2",
      name: "Maria Lopez",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      joinedOn: "Feb 5, 2023",
      image: "",
    },
    {
      id: "3",
      name: "John Davis",
      email: "john@example.com",
      phone: "+1 (555) 345-6789",
      joinedOn: "Feb 10, 2023",
      image: "",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      joinedOn: "Mar 15, 2023",
      image: "",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 567-8901",
      joinedOn: "Apr 2, 2023",
      image: "",
    },
    {
      id: "6",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+1 (555) 678-9012",
      joinedOn: "Apr 20, 2023",
      image: "",
    },
  ]

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // In a real app, this data would come from your API
  const availableMembers = [
    {
      id: "7",
      name: "David Lee",
      email: "david@example.com",
      image: "",
    },
    {
      id: "8",
      name: "Sophia Garcia",
      email: "sophia@example.com",
      image: "",
    },
    {
      id: "9",
      name: "James Wilson",
      email: "james@example.com",
      image: "",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-lime-500 hover:bg-lime-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Member to Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Search members..." />
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availableMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
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
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-lime-500 hover:bg-lime-600">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
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
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.joinedOn}</TableCell>
                <TableCell>
                  <Button variant="default" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove member</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

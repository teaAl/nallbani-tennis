"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import { members } from "./data"; // In a real app, this data would come from your API
import Link from "next/link";

// interface MembersListProps {
//   onViewMember?: (id: string) => void;
// }

// export function MembersList({ onViewMember }: MembersListProps) {
export function MembersList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <button className="font-medium hover:underline text-left">
                      <Link href={`/admin/members/${member.id}`}>
                        {member.name}
                      </Link>
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
                    <DropdownItem>
                      <Link href={`/admin/members/${member.id}`}>
                        View Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem>Edit Member</DropdownItem>
                    <DropdownItem>Schedule Lesson</DropdownItem>
                    <DropdownItem className="text-red-600">
                      Deactivate Member
                    </DropdownItem>
                  </CustomDropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

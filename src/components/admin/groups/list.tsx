"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import { groups } from "./data"; // In a real app, this data would come from your API
import { useAdminFilterStore } from "@/stores/adminFilterStore";

// interface GroupsListProps {
//   onViewGroup?: (id: string) => void;
// }

// export function GroupsList({ onViewGroup }: GroupsListProps) {
export function GroupsList() {
  const { searchQuery, setSearchQuery } = useAdminFilterStore();
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-pear" />
          <Input
            placeholder="Search groups..."
            className="pl-8 bg-yellow-100/10 text-gray-900 border border-gray-900/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border border-pear/30">
        <Table>
          <TableHeader>
            <TableRow className="cursor-default bg-pear/30 hover:!bg-pear/30  font-bold font-poppins uppercase">
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
                  <button className="hover:underline text-left cursor-pointer font-semibold text-gray-900">
                    <Link href={`/admin/groups/${group.id}`}>{group.name}</Link>
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
                      <button className="cursor-pointer text-gray-900 hover:text-gray-800 ">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </button>
                    }
                  >
                    <DropdownItem>
                      <Link href={`/admin/groups/${group.id}`}>
                        View Details
                      </Link>
                    </DropdownItem>
                    <DropdownItem>Edit Group</DropdownItem>
                    <DropdownItem className="text-red-600">
                      Delete Group
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

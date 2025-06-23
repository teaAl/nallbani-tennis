"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMemberStore } from "@/stores/memberStore";

export function MembersList() {
  // const [searchQuery, setSearchQuery] = useState("");
  const { members, loading, error, fetchMembers } = useMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const safeMembers = Array.isArray(members) ? members : [];
  const pendingUsers = safeMembers.filter((user) => user.status === "PENDING");
  return (
    <div className="space-y-4">
      {/* <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div> */}

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6">
          {pendingUsers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined On</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {filteredMembers.map((member) => ( */}
                  {pendingUsers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />

                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n: string) => n[0])
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
                          <div className="text-sm text-gray-500">
                            {member.phoneNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-500">
                            {member.status}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(member.createdAt)}</TableCell>
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
          ) : (
            <div>
              <p className="text-gray-500 text-center py-4">
                No pending members
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {filteredMembers.map((member) => ( */}
                {safeMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={`/images/avatars/${member.avatar}.jpg`}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n: string) => n[0])
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
                        <div className="text-sm text-gray-500">
                          {member.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          {member.status}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(member.createdAt)}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

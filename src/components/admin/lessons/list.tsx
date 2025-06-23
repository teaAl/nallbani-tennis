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
import { useAdminFilterStore } from "@/stores/adminFilterStore";

export function LessonsList() {
  const { searchQuery, setSearchQuery } = useAdminFilterStore();

  // In a real app, this data would come from your API
  const lessons = [
    {
      id: "1",
      date: "Apr 25, 2023",
      time: "10:00 AM - 11:00 AM",
      member: {
        name: "Sarah Johnson",
        image: "",
      },
      type: "Individual",
      status: "Upcoming",
      court: "Court 1",
    },
    {
      id: "2",
      date: "Apr 25, 2023",
      time: "2:00 PM - 3:30 PM",
      member: {
        name: "Intermediate Adults",
        image: "",
      },
      type: "Group",
      status: "Upcoming",
      court: "Court 2",
    },
    {
      id: "3",
      date: "Apr 24, 2023",
      time: "4:00 PM - 5:00 PM",
      member: {
        name: "Michael Brown",
        image: "",
      },
      type: "Individual",
      status: "Completed",
      court: "Court 1",
    },
    {
      id: "4",
      date: "Apr 24, 2023",
      time: "6:00 PM - 7:30 PM",
      member: {
        name: "Advanced Teens",
        image: "",
      },
      type: "Group",
      status: "Completed",
      court: "Court 2",
    },
    {
      id: "5",
      date: "Apr 23, 2023",
      time: "9:00 AM - 10:00 AM",
      member: {
        name: "Emma Wilson",
        image: "",
      },
      type: "Individual",
      status: "Completed",
      court: "Court 1",
    },
  ];

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search lessons..."
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
              <TableHead>Date & Time</TableHead>
              <TableHead>Member/Group</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Court</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  <div className="font-medium">{lesson.date}</div>
                  <div className="text-sm text-gray-500">{lesson.time}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={lesson.member.image}
                        alt={lesson.member.name}
                      />
                      <AvatarFallback>
                        {lesson.member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{lesson.member.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lesson.type === "Individual" ? "outline" : "default"
                    }
                  >
                    {lesson.type}
                  </Badge>
                </TableCell>
                <TableCell>{lesson.court}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      lesson.status === "Upcoming"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {lesson.status}
                  </Badge>
                </TableCell>
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
                    <DropdownItem>View Details</DropdownItem>
                    <DropdownItem>Edit Lesson</DropdownItem>
                    <DropdownItem>Add Summary</DropdownItem>
                    <DropdownItem className="text-red-600">
                      Cancel Lesson
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

// MOCKED DATA - ADJUST API

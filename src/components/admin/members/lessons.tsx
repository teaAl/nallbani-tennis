"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileEdit } from "lucide-react"

interface MemberLessonsProps {
  memberId: string
}

export function MemberLessons({ memberId }: MemberLessonsProps) {
  // In a real app, this data would come from your API based on the memberId
  const lessons = [
    {
      id: "1",
      date: "Apr 25, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Individual",
      status: "Upcoming",
      court: "Court 1",
      notes: "Focus on backhand technique",
    },
    {
      id: "2",
      date: "Apr 18, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Individual",
      status: "Completed",
      court: "Court 1",
      notes: "Worked on serve technique. Good progress on toss consistency.",
    },
    {
      id: "3",
      date: "Apr 11, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Individual",
      status: "Completed",
      court: "Court 2",
      notes: "Focused on forehand groundstrokes. Need to work on follow-through.",
    },
    {
      id: "4",
      date: "Apr 4, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Individual",
      status: "Completed",
      court: "Court 1",
      notes: "Initial assessment. Intermediate level with good forehand, weak backhand.",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Court</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>
                <div className="font-medium">{lesson.date}</div>
                <div className="text-sm text-gray-500">{lesson.time}</div>
              </TableCell>
              <TableCell>
                <Badge variant={lesson.type === "Individual" ? "outline" : "default"}>{lesson.type}</Badge>
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
                <div className="max-w-xs truncate">{lesson.notes}</div>
              </TableCell>
              <TableCell>
                {lesson.status === "Completed" && (
                  <Button variant="default" size="sm">
                    <FileEdit className="h-4 w-4" />
                    <span className="sr-only">Edit notes</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

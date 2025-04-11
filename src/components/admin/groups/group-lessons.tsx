"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, Plus, FileEdit } from "lucide-react"
import { cn } from "@/lib/cn"

interface GroupLessonsProps {
  groupId: string
}

export function GroupLessons({ groupId }: GroupLessonsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<Date>()

  // In a real app, this data would come from your API based on the groupId
  const lessons = [
    {
      id: "1",
      date: "Apr 10, 2023",
      time: "6:00 PM - 7:30 PM",
      topic: "Forehand Technique",
      summary:
        "Worked on proper grip and follow-through for forehand shots. Most members showed improvement in consistency.",
      attendance: "6/6",
    },
    {
      id: "2",
      date: "Apr 12, 2023",
      time: "6:00 PM - 7:30 PM",
      topic: "Backhand Technique",
      summary: "Focused on one-handed and two-handed backhand techniques. Practiced cross-court backhand drills.",
      attendance: "5/6",
    },
    {
      id: "3",
      date: "Apr 17, 2023",
      time: "6:00 PM - 7:30 PM",
      topic: "Serve Basics",
      summary: "Covered proper stance, grip, and ball toss for serves. Practiced first and second serves.",
      attendance: "6/6",
    },
    {
      id: "4",
      date: "Apr 19, 2023",
      time: "6:00 PM - 7:30 PM",
      topic: "Volleys and Net Play",
      summary: "Worked on volley technique and positioning at the net. Practiced approach shots and volleys.",
      attendance: "4/6",
    },
  ]

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search lessons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-lime-500 hover:bg-lime-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Lesson Summary</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input placeholder="e.g. 6:00 PM - 7:30 PM" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input placeholder="e.g. Forehand Technique" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Summary</label>
                <Textarea
                  placeholder="Describe what was covered in the lesson and any notable progress..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Attendance</label>
                <Input placeholder="e.g. 6/8" />
              </div>

              <div className="flex justify-end">
                <Button className="bg-lime-500 hover:bg-lime-600">Save Lesson</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.date}</TableCell>
                <TableCell>{lesson.time}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{lesson.topic}</div>
                    <div className="text-sm text-gray-500 mt-1">{lesson.summary}</div>
                  </div>
                </TableCell>
                <TableCell>{lesson.attendance}</TableCell>
                <TableCell>
                  <Button variant="default" size="sm">
                    <FileEdit className="h-4 w-4" />
                    <span className="sr-only">Edit lesson</span>
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

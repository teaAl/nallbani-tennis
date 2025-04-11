"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/memberCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

export function CourtScheduler() {
  const [selectedDay, setSelectedDay] = useState("monday")

  // In a real app, this data would come from your API
  const availabilityData = {
    monday: [
      { id: "1", start: "08:00", end: "10:00", court: "Court 1" },
      { id: "2", start: "14:00", end: "16:00", court: "Court 1" },
      { id: "3", start: "18:00", end: "20:00", court: "Court 2" },
    ],
    tuesday: [
      { id: "4", start: "09:00", end: "11:00", court: "Court 1" },
      { id: "5", start: "15:00", end: "17:00", court: "Court 2" },
    ],
    wednesday: [
      { id: "6", start: "08:00", end: "10:00", court: "Court 1" },
      { id: "7", start: "14:00", end: "16:00", court: "Court 1" },
    ],
    thursday: [
      { id: "8", start: "09:00", end: "11:00", court: "Court 2" },
      { id: "9", start: "15:00", end: "17:00", court: "Court 1" },
    ],
    friday: [
      { id: "10", start: "08:00", end: "10:00", court: "Court 1" },
      { id: "11", start: "14:00", end: "16:00", court: "Court 2" },
    ],
    saturday: [
      { id: "12", start: "10:00", end: "14:00", court: "Court 1" },
      { id: "13", start: "10:00", end: "14:00", court: "Court 2" },
    ],
    sunday: [
      { id: "14", start: "10:00", end: "14:00", court: "Court 1" },
      { id: "15", start: "10:00", end: "14:00", court: "Court 2" },
    ],
  }

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue={selectedDay}>
          <TabsList className="grid grid-cols-7">
            {days.map((day) => (
              <TabsTrigger key={day.value} value={day.value}>
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day.value} value={day.value} className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{day.label} Availability</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-lime-500 hover:bg-lime-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Available Time Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Court</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select court" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="court1">Court 1</SelectItem>
                            <SelectItem value="court2">Court 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Time</Label>
                          <Input type="time" />
                        </div>
                        <div className="space-y-2">
                          <Label>End Time</Label>
                          <Input type="time" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Repeat</Label>
                        <Select defaultValue="no">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">Do not repeat</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom...</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-lime-500 hover:bg-lime-600">Add Time Slot</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {availabilityData[day.value as keyof typeof availabilityData].length > 0 ? (
                <div className="space-y-3">
                  {availabilityData[day.value as keyof typeof availabilityData].map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                      <div>
                        <div className="font-medium">{slot.court}</div>
                        <div className="text-sm text-gray-500">
                          {slot.start} - {slot.end}
                        </div>
                      </div>
                      <Button variant="default" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove time slot</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No available time slots for {day.label}. Add some time slots for members to book.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

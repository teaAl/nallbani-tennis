"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/memberCard"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/cn"

interface ScheduleLessonFormProps {
  onSuccess?: () => void
}

export function ScheduleLessonForm({ onSuccess }: ScheduleLessonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    type: "individual",
    memberOrGroup: "",
    date: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    court: "",
    notes: "",
  })

  // In a real app, this data would come from your API
  const members = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Brown" },
    { id: "3", name: "Emma Wilson" },
    { id: "4", name: "Alex Kim" },
    { id: "5", name: "Maria Lopez" },
    { id: "6", name: "John Davis" },
  ]

  const groups = [
    { id: "1", name: "Beginner Kids" },
    { id: "2", name: "Intermediate Adults" },
    { id: "3", name: "Advanced Teens" },
    { id: "4", name: "Senior Beginners" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.type) {
      newErrors.type = "Please select a lesson type."
    }

    if (!formData.memberOrGroup) {
      newErrors.memberOrGroup = `Please select a ${formData.type === "individual" ? "member" : "group"}.`
    }

    if (!formData.date) {
      newErrors.date = "Please select a date."
    }

    if (!formData.startTime) {
      newErrors.startTime = "Please select a start time."
    }

    if (!formData.endTime) {
      newErrors.endTime = "Please select an end time."
    }

    if (!formData.court) {
      newErrors.court = "Please select a court."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // In a real app, you would submit this data to your API
    console.log(formData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess?.()
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Lesson Type</label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <label htmlFor="individual" className="font-normal cursor-pointer">
                  Individual
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <label htmlFor="group" className="font-normal cursor-pointer">
                  Group
                </label>
              </div>
            </RadioGroup>
            {errors.type && <p className="text-sm font-medium text-red-500">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{formData.type === "individual" ? "Member" : "Group"}</label>
            <Select
              onValueChange={(value) => handleSelectChange("memberOrGroup", value)}
              value={formData.memberOrGroup}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select a ${formData.type === "individual" ? "member" : "group"}`} />
              </SelectTrigger>
              <SelectContent>
                {formData.type === "individual"
                  ? members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))
                  : groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
            {errors.memberOrGroup && <p className="text-sm font-medium text-red-500">{errors.memberOrGroup}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full pl-3 text-left font-normal", !formData.date && "text-gray-400")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-sm font-medium text-red-500">{errors.date}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                {errors.startTime && <p className="text-sm font-medium text-red-500">{errors.startTime}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <Input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                {errors.endTime && <p className="text-sm font-medium text-red-500">{errors.endTime}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Court</label>
            <Select onValueChange={(value) => handleSelectChange("court", value)} value={formData.court}>
              <SelectTrigger>
                <SelectValue placeholder="Select a court" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="court1">Court 1</SelectItem>
                <SelectItem value="court2">Court 2</SelectItem>
              </SelectContent>
            </Select>
            {errors.court && <p className="text-sm font-medium text-red-500">{errors.court}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              placeholder="Any special instructions or focus areas for this lesson..."
              className="min-h-[100px]"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit" className="bg-lime-500 hover:bg-lime-600" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Lesson"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

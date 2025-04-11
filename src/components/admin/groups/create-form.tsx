"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/memberCard"

interface CreateGroupFormProps {
  onSuccess?: () => void
}

export function CreateGroupForm({ onSuccess }: CreateGroupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    maxMembers: "8",
    schedule: "",
    description: "",
    goals: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Group name must be at least 2 characters."
    }

    if (!formData.level) {
      newErrors.level = "Please select a level."
    }

    const maxMembers = Number.parseInt(formData.maxMembers)
    if (isNaN(maxMembers) || maxMembers < 1) {
      newErrors.maxMembers = "Group must allow at least 1 member."
    } else if (maxMembers > 20) {
      newErrors.maxMembers = "Group cannot have more than 20 members."
    }

    if (!formData.schedule || formData.schedule.length < 2) {
      newErrors.schedule = "Please provide a schedule."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Group Name</label>
              <Input name="name" placeholder="e.g. Intermediate Adults" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="text-sm font-medium text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Select onValueChange={(value) => handleSelectChange("level", value)} value={formData.level}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && <p className="text-sm font-medium text-red-500">{errors.level}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Members</label>
              <Input type="number" name="maxMembers" value={formData.maxMembers} onChange={handleChange} />
              <p className="text-sm text-gray-500">The maximum number of members allowed in this group.</p>
              {errors.maxMembers && <p className="text-sm font-medium text-red-500">{errors.maxMembers}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Schedule</label>
              <Input
                placeholder="e.g. Mon, Wed 4:00 PM"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500">Days and times when this group meets.</p>
              {errors.schedule && <p className="text-sm font-medium text-red-500">{errors.schedule}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the group, focus areas, etc."
              className="min-h-[100px]"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Group Goals</label>
            <Textarea
              placeholder="What are the goals for this group?"
              className="min-h-[100px]"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit" className="bg-lime-500 hover:bg-lime-600" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

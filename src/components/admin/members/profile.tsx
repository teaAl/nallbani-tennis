"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/memberCard"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Calendar } from "lucide-react"
import Link from "next/link"

interface MemberProfileProps {
  id: string
}

export function MemberProfile({ id }: MemberProfileProps) {
  // In a real app, this data would come from your API based on the id
  const member = {
    id,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    level: "Intermediate",
    joinedOn: "Mar 15, 2023",
    image: "",
    address: "123 Tennis Court Lane, Tennis City, TC 12345",
    emergencyContact: "John Johnson, +1 (555) 123-4567",
    notes: "Prefers evening lessons. Working on improving backhand technique.",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="text-3xl">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <Badge variant="outline">{member.level}</Badge>
                </div>
                <p className="text-gray-500 mt-1">Member since {member.joinedOn}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/lessons/new?member=${id}`}>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Lesson
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-medium text-gray-500">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Email:</span> {member.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {member.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {member.address}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Emergency Contact</h3>
                <p className="mt-2">{member.emergencyContact}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-500">Notes</h3>
              <p className="mt-2">{member.notes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

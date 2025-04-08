"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/memberCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Clock, MapPin, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import ActionButton from "../ui/actionbtn"

export default function BookingsList() {
  // This would come from your API in a real implementation
  const bookings = {
    upcoming: [
      {
        id: 1,
        court: "Court 3",
        date: "November 15, 2023",
        time: "18:00 - 19:30",
        type: "Singles",
        partner: "Alex Johnson",
        status: "confirmed",
      },
      {
        id: 2,
        court: "Court 1",
        date: "November 20, 2023",
        time: "17:00 - 18:30",
        type: "Lesson",
        partner: "Coach Mike",
        status: "confirmed",
      },
    ],
    past: [
      {
        id: 3,
        court: "Court 2",
        date: "November 5, 2023",
        time: "10:00 - 11:30",
        type: "Doubles",
        partner: "Team match",
        status: "completed",
      },
      {
        id: 4,
        court: "Court 4",
        date: "October 28, 2023",
        time: "16:00 - 17:30",
        type: "Singles",
        partner: "Sarah Williams",
        status: "completed",
      },
    ],
  }

  const [selectedBooking, setSelectedBooking] = useState(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-pear text-gray-900"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-700 text-white/30"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      {/* TODO: change this to some kind of filter: All | Upcoming | Past */}
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {bookings.upcoming.length === 0 ? (
            <div className="text-center py-8 text-foreground/90">No upcoming bookings</div>
          ) : (
            <div className="space-y-4">
              {bookings.upcoming.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="bg-gradient-to-r from-gray-900 to-pear/5 p-4 sm:w-32 flex flex-col justify-center items-center">
                        <div className="text-xl font-bold text-foreground">{booking.date.split(",")[0].split(" ")[1]}</div>
                        <div className="text-sm text-foreground">{booking.date.split(",")[0].split(" ")[0]}</div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-light text-lg text-pear">
                            <span className="text-foreground">{booking.type}</span> - {booking.court}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-foreground/70">
                            <Clock className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-sm text-foreground/70">
                            <MapPin className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.court}
                          </div>
                          <div className="flex items-center text-sm text-foreground/70">
                            <Users className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.partner}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-l from-gray-900/30 to-gray-900 p-3 flex justify-end space-x-2">
                      <ActionButton variant="outline" size="sm" text="Reschedule" />
                      <ActionButton variant="primary" size="sm" text="Cancel" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center mt-6">
              <ActionButton variant="secondary" size="md" text="Book a Court"  />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {bookings.past.length === 0 ? (
            <div className="text-center py-8 text-foreground">No past bookings</div>
          ) : (
            <div className="space-y-4">
              {bookings.past.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="bg-gradient-to-r from-gray-900 to-pear/5 p-4 sm:w-32 flex flex-col justify-center items-center">
                        <div className="text-xl font-bold text-foreground">{booking.date.split(",")[0].split(" ")[1]}</div>
                        <div className="text-sm text-foreground">{booking.date.split(",")[0].split(" ")[0]}</div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-light text-lg text-pear">
                            <span className="text-foreground">{booking.type}</span> - {booking.court}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-foreground/70">
                            <Clock className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-sm text-foreground/70">
                            <MapPin className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.court}
                          </div>
                          <div className="flex items-center text-sm text-foreground/70">
                            <Users className="h-4 w-4 mr-2 text-pear/70" />
                            {booking.partner}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-l from-gray-900/30 to-gray-900 p-3 flex justify-end space-x-2">
                      <ActionButton variant="primary" size="sm" text="Book Similar" />
                      <ActionButton variant="ghost" size="sm" text="View Feedback" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

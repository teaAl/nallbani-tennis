"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/memberCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity() {
  // In a real app, this data would come from your API
  const activities = [
    {
      id: "1",
      user: { name: "Alex Kim", image: "" },
      action: "booked a court",
      time: "10 minutes ago",
    },
    {
      id: "2",
      user: { name: "Maria Lopez", image: "" },
      action: "joined Intermediate Adults group",
      time: "2 hours ago",
    },
    {
      id: "3",
      user: { name: "John Davis", image: "" },
      action: "canceled tomorrow's lesson",
      time: "5 hours ago",
    },
    {
      id: "4",
      user: { name: "Sarah Johnson", image: "" },
      action: "scheduled a private lesson",
      time: "Yesterday",
    },
    {
      id: "5",
      user: { name: "Coach Mike", image: "" },
      action: "created a new Beginner Kids group",
      time: "Yesterday",
    },
  ];

  return (
    <Card className="bg-gray-900">
      <CardHeader className="bg-gray-900 rounded-t-md border-b border-b-foreground/30">
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={activity.user.image}
                  alt={activity.user.name}
                />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none ">
                  <span className="font-semibold text-foreground/70">
                    {activity.user.name}
                  </span>{" "}
                  <span className="text-foreground">{activity.action}</span>
                </p>
                <p className="text-sm text-pear/70">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

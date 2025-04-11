"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/memberCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function UpcomingLessons() {
  // In a real app, this data would come from your API
  const lessons = [
    {
      id: "1",
      time: "Today, 10:00 AM",
      type: "Group",
      name: "Intermediate Adults",
      members: [
        { id: "1", name: "Alex K", image: "" },
        { id: "2", name: "Maria L", image: "" },
        { id: "3", name: "John D", image: "" },
      ],
    },
    {
      id: "2",
      time: "Today, 2:00 PM",
      type: "Individual",
      name: "Sarah Johnson",
      members: [{ id: "4", name: "Sarah J", image: "" }],
    },
    {
      id: "3",
      time: "Tomorrow, 9:00 AM",
      type: "Group",
      name: "Beginner Kids",
      members: [
        { id: "5", name: "Emma P", image: "" },
        { id: "6", name: "Lucas M", image: "" },
        { id: "7", name: "Olivia S", image: "" },
        { id: "8", name: "Noah T", image: "" },
      ],
    },
  ];

  return (
    <Card className="bg-gray-900">
      <CardHeader className="bg-gray-900 rounded-t-md border-b border-b-foreground/30">
        <CardTitle className="text-foreground">Upcoming Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="flex items-start space-x-4">
              <div className="bg-gray-800 p-3 rounded-md text-center min-w-[60px]">
                <div className="text-xs text-pear border-b border-pear/10 pb-2">
                  {lesson.time.split(",")[0]}
                </div>
                <div className="pt-1 text-foreground/70">
                  {lesson.time.split(",")[1]}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {lesson.name}
                    </h4>
                    <Badge
                      variant={lesson.type === "Group" ? "dark" : "pear"}
                      className="mt-1"
                    >
                      {lesson.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex -space-x-2 mt-2">
                  {lesson.members.map((member) => (
                    <Avatar
                      key={member.id}
                      className="h-8 w-8 border-2 border-white"
                    >
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {lesson.members.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                      +{lesson.members.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/memberCard";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";

interface GroupDetailsProps {
  id: string;
}

// In a real app, this data would come from your API
const groups = [
  {
    id: "1",
    name: "Beginner Kids",
    level: "Beginner",
    members: 8,
    maxMembers: 10,
    schedule: "Mon, Wed 4:00 PM",
    description:
      "This group focuses on improving technique and match play for intermediate adult players. We work on consistency, shot selection, and strategy.",
    goals:
      "Develop consistent topspin groundstrokes, improve serve accuracy, and learn effective doubles strategies.",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Intermediate Adults",
    level: "Intermediate",
    members: 6,
    maxMembers: 8,
    schedule: "Tue, Thu 6:00 PM",
    description:
      "This group focuses on improving technique and match play for intermediate adult players. We work on consistency, shot selection, and strategy.",
    goals:
      "Develop consistent topspin groundstrokes, improve serve accuracy, and learn effective doubles strategies.",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "3",
    name: "Advanced Teens",
    level: "Advanced",
    members: 4,
    maxMembers: 6,
    schedule: "Fri 5:00 PM, Sat 10:00 AM",
    description:
      "This group focuses on improving technique and match play for intermediate adult players. We work on consistency, shot selection, and strategy.",
    goals:
      "Develop consistent topspin groundstrokes, improve serve accuracy, and learn effective doubles strategies.",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "4",
    name: "Senior Beginners",
    level: "Beginner",
    members: 5,
    maxMembers: 8,
    schedule: "Mon, Wed 10:00 AM",
    description:
      "This group focuses on improving technique and match play for intermediate adult players. We work on consistency, shot selection, and strategy.",
    goals:
      "Develop consistent topspin groundstrokes, improve serve accuracy, and learn effective doubles strategies.",
    createdAt: "Jan 15, 2023",
  },
];

export function GroupDetails({ id }: GroupDetailsProps) {
  const [group, setGroup] = useState<{
    id: string;
    name: string;
    level: string;
    members: number;
    maxMembers: number;
    schedule: string;
    description: string;
    goals: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    // async function fetchGroup() {
    //   const res = await fetch(`/api/groups/${id}`);
    //   const data = await res.json();
    //   setGroup(data);
    // }

    // fetchGroup();
    groups.map((group) => {
      if (group.id === id) {
        setGroup(group);
      }
    });
  }, [id]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{group.name}</h2>
              <Badge variant="outline">{group.level}</Badge>
            </div>
            <p className="text-gray-500 mt-1">Created on {group.createdAt}</p>
          </div>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="font-medium text-gray-500">Members</h3>
            <p className="mt-1 font-medium">
              {group.members}/{group.maxMembers}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Schedule</h3>
            <p className="mt-1 font-medium">{group.schedule}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-500">Description</h3>
          <p className="mt-1">{group.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-500">Goals</h3>
          <p className="mt-1">{group.goals}</p>
        </div>
      </CardContent>
    </Card>
  );
}
/* 
TODO:
- create goals and progress journey for groups
 */

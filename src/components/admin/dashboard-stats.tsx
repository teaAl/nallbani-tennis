"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/memberCard";
import { Users, Calendar, Clock, TrendingUp } from "lucide-react";

export function DashboardStats() {
  // In a real app, this data would come from your API
  const stats = [
    {
      title: "Total Members",
      value: "42",
      icon: Users,
      change: "+5% from last month",
    },
    {
      title: "Active Groups",
      value: "8",
      icon: Users,
      change: "+2 from last month",
    },
    {
      title: "Lessons This Week",
      value: "24",
      icon: Calendar,
      change: "Same as last week",
    },
    {
      title: "Court Utilization",
      value: "78%",
      icon: Clock,
      change: "+12% from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-5 w-5 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pear">{stat.value}</div>
            <p className="text-xs text-foreground/70 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-pear" />
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

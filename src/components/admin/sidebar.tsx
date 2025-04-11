"use client"

import { useState } from "react"
import { cn } from "@/lib/cn"
import { Calendar, Users, UserCircle, BarChart, Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminView } from "@/context/adminProvider"

export function Sidebar() {
  const { currentView, setView } = useAdminView()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      view: "dashboard",
      icon: BarChart,
    },
    {
      name: "Groups",
      view: "groups",
      icon: Users,
    },
    {
      name: "Lessons",
      view: "lessons",
      icon: Calendar,
    },
    {
      name: "Members",
      view: "members",
      icon: UserCircle,
    },
    {
      name: "Court Availability",
      view: "court-availability",
      icon: Clock,
    },
  ]

  return (
    <aside
      className={cn("bg-lime-600 text-white transition-all duration-300 flex flex-col", collapsed ? "w-16" : "w-64")}
    >
      <div className="h-16 flex items-center px-4 border-b border-lime-700">
        {!collapsed && <div className="font-bold text-xl">Nallbani Tennis</div>}
        <Button
          variant="default"
          size="sm"
          className="ml-auto text-white hover:bg-lime-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setView(item.view as any)}
                className={cn(
                  "flex w-full items-center py-2 px-3 rounded-md transition-colors",
                  currentView === item.view ? "bg-lime-700" : "hover:bg-lime-700",
                  collapsed ? "justify-center" : "",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-lime-700">
        <button
          className={cn(
            "flex w-full items-center py-2 px-3 rounded-md transition-colors hover:bg-lime-700",
            collapsed ? "justify-center" : "",
          )}
        >
          <UserCircle className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Switch to Member</span>}
        </button>
      </div>
    </aside>
  )
}

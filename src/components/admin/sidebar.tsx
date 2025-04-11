"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  Calendar,
  Users,
  UserCircle,
  BarChart,
  Clock,
  Menu,
  X,
  PowerCircle,
} from "lucide-react";
import { useAdminView } from "@/context/adminProvider";

export function Sidebar() {
  const { currentView, setView } = useAdminView();
  const [collapsed, setCollapsed] = useState(false);

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
    {
      name: "Profile",
      view: "admin-profile",
      icon: UserCircle,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-gray-900 text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-foreground/30 text-pear">
        {!collapsed && <div className="font-bold text-xl">Nallbani Tennis</div>}
        <button
          className="ml-auto text-pear"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
      <nav className="flex-1 py-4 text-foreground">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setView(item.view as any)}
                className={cn(
                  "flex w-full items-center py-2 px-3 rounded-md transition-colors cursor-pointer",
                  currentView === item.view
                    ? "bg-gray-800"
                    : "hover:bg-gray-800",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-foreground/30">
        <button
          className={cn(
            "flex w-full items-center py-2 px-3 rounded-md transition-colors hover:bg-gray-800 cursor-pointer",
            collapsed ? "justify-center" : ""
          )}
        >
          <PowerCircle className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
          {/* Instead of logout consider a button that takes the admin home */}
        </button>
      </div>
    </aside>
  );
}
/*
TODO:
- create admin profile view - consider the commented out code in the admin-header.tsx --> nallbani-tennis/src/components/admin/admin-header.tsx
*/

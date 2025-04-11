"use client"

import { useAdminView } from "@/context/adminProvider"

// Dashboard components
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { UpcomingLessons } from "@/components/admin/upcoming-lessons"
import { RecentActivity } from "@/components/admin/recent-activity"

// Groups components
import { GroupsList } from "@/components/admin/groups/list"
import { CreateGroupForm } from "@/components/admin/groups/create-form"
import { GroupDetails } from "@/components/admin/groups/group-details"
import { GroupMembers } from "@/components/admin/groups/group-members"
import { GroupLessons } from "@/components/admin/groups/group-lessons"

// Lessons components
import { LessonsList } from "@/components/admin/lessons/list"
import { ScheduleLessonForm } from "@/components/admin/lessons/schedule-form"

// Court components
import { CourtScheduler } from "@/components/admin/court/scheduler"

// Members components
import { MembersList } from "@/components/admin/members/list"
import { MemberProfile } from "@/components/admin/members/profile"
import { MemberLessons } from "@/components/admin/members/lessons"
import { MemberGroups } from "@/components/admin/members/groups"

// UI components
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, UserPlus } from "lucide-react"

export function AdminDashboard() {
  const { currentView, viewParams, setView } = useAdminView()

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Coach Dashboard</h1>
        <DashboardStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpcomingLessons />
          <RecentActivity />
        </div>
      </div>
    )
  }

  // Groups Views
  if (currentView === "groups") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Training Groups</h1>
          <Button className="bg-lime-500 hover:bg-lime-600" onClick={() => setView("group-new")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
        <GroupsList onViewGroup={(id) => setView("group-details", { id })} />
      </div>
    )
  }

  if (currentView === "group-new") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
        <CreateGroupForm onSuccess={() => setView("groups")} />
      </div>
    )
  }

  if (currentView === "group-details") {
    const groupId = viewParams.id || "1"
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" className="mr-4" onClick={() => setView("groups")}>
            Back to Groups
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Group Details</h1>
        </div>
        <GroupDetails id={groupId} />

        <Tabs defaultValue="members">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="mt-6">
            <GroupMembers groupId={groupId} />
          </TabsContent>
          <TabsContent value="lessons" className="mt-6">
            <GroupLessons groupId={groupId} />
          </TabsContent>
          <TabsContent value="goals" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">Group Goals & Progress</h3>
              {/* Goals and progress content */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Lessons Views
  if (currentView === "lessons") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Individual Lessons</h1>
          <Button className="bg-lime-500 hover:bg-lime-600" onClick={() => setView("lesson-new")}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Lesson
          </Button>
        </div>
        <LessonsList />
      </div>
    )
  }

  if (currentView === "lesson-new") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Schedule New Lesson</h1>
        <ScheduleLessonForm onSuccess={() => setView("lessons")} />
      </div>
    )
  }

  // Court Availability View
  if (currentView === "court-availability") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Court Availability</h1>
        <p className="text-gray-600">
          Set available hours for member bookings when courts are not being used for coaching.
        </p>
        <CourtScheduler />
      </div>
    )
  }

  // Members Views
  if (currentView === "members") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <Button className="bg-lime-500 hover:bg-lime-600" onClick={() => setView("member-new")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        <MembersList onViewMember={(id) => setView("member-details", { id })} />
      </div>
    )
  }

  if (currentView === "member-details") {
    const memberId = viewParams.id || "1"
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" className="mr-4" onClick={() => setView("members")}>
            Back to Members
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Member Profile</h1>
        </div>
        <MemberProfile id={memberId} />

        <Tabs defaultValue="lessons">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="lessons" className="mt-6">
            <MemberLessons memberId={memberId} />
          </TabsContent>
          <TabsContent value="groups" className="mt-6">
            <MemberGroups memberId={memberId} />
          </TabsContent>
          <TabsContent value="progress" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">Progress Tracking</h3>
              {/* Progress tracking content */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p>The requested view could not be found.</p>
      <Button onClick={() => setView("dashboard")}>Return to Dashboard</Button>
    </div>
  )
}

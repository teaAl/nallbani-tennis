import { DashboardStats } from "@/components/admin/dashboard-stats";
import { UpcomingLessons } from "@/components/admin/upcoming-lessons";
import { RecentActivity } from "@/components/admin/recent-activity";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Coach Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingLessons />
        <RecentActivity />
      </div>
    </div>
  );
}

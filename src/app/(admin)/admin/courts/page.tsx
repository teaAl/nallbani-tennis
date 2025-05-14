import { CourtScheduler } from "@/components/admin/courts-availability/scheduler";
import AddCourts from "@/components/admin/courts/addCourt";

export default function CourtAvailabilityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Courts</h1>
      <p className="text-gray-600">
        You can create a court here to use it for lessons or for members to
        book.
      </p>
      <AddCourts />
    </div>
  );
}

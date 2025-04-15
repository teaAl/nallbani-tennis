import { CourtScheduler } from "@/components/admin/court/scheduler"

export default function CourtAvailabilityPage() {
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

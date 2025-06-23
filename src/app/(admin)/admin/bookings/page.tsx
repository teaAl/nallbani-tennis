import Bookings from "@/components/admin/bookings/bookings";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Court Bookings</h1>
      <p className="text-gray-600">
        Manage court bookings for members and guests. Ensure that courts are
        booked efficiently and conflicts are minimized.
      </p>
      <Bookings />
    </div>
  );
}

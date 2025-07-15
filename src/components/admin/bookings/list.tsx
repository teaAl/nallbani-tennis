import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useBookingStore } from "@/stores/bookingStore";
import { useCourtStore } from "@/stores/courtStore";
import { useMemberStore } from "@/stores/memberStore";
import { useCourtAvailabilityStore } from "@/stores/courtAvailabilityStore";

const BookingsList = () => {
  const { bookings, bookingTypeFilter, fetchBookings } = useBookingStore();
  // const { courts, fetchCourts } = useCourtStore();
  const { allAvailabilities, fetchAllAvailabilities } =
    useCourtAvailabilityStore();
  const { members, fetchMembers } = useMemberStore();

  useEffect(() => {
    fetchBookings();
    fetchAllAvailabilities();
    fetchMembers();
    console.log("courts > ", allAvailabilities);
  }, [fetchBookings, fetchAllAvailabilities, fetchMembers]);

  const filteredBookings = bookings.filter(
    (booking) => booking.bookerType === bookingTypeFilter
  );

  const getCourtName = (courtId: string) => {
    const court = allAvailabilities.find((c) => c.id === courtId);
    return court ? court.name : courtId;
  };

  const getUserName = (userId: string) => {
    const user = members.find((m) => m.id === userId);
    return user ? user.name : userId;
  };

  return (
    <div>
      {filteredBookings.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking Id</TableHead>
                <TableHead>Court</TableHead>
                <TableHead>Booker</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    {getCourtName(booking.courtAvailabilityId)}
                  </TableCell>
                  {booking.bookerType === "MEMBER" ? (
                    <TableCell>{getUserName(booking.userId ?? "")}</TableCell>
                  ) : (
                    <TableCell>{booking.guestName}</TableCell>
                  )}
                  <TableCell>{booking.createdAt}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">
          No bookings found for {bookingTypeFilter}.
        </p>
      )}
    </div>
  );
};

export default BookingsList;

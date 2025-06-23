import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const BookingsList = ({ filter }: { filter: "MEMBER" | "GUEST" }) => {
  const [bookingType, setBookingType] = useState<"MEMBER" | "GUEST">(filter);
  const [bookingsData, setBookingsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings" + response.statusText);
        }
        const data = await response.json();
        console.log("Bookings fetched:", data);
        setBookingsData(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [filter]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      {bookingsData.length > 0 &&
        (bookingsData.filter((booking) => booking.bookerType === bookingType)
          .length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking Id</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Booker</TableHead>
                  {/* {bookingType === "MEMBER" ? (
                    <TableHead>Member ID</TableHead>
                  ) : (
                    <>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Guest Email</TableHead>
                      <TableHead>Guest Phone</TableHead>
                    </>
                  )} */}
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        ) : (
          // <ul className="space-y-4">
          //   {bookingsData
          //     .filter((booking) => booking.bookerType === bookingType)
          //     .map((booking) => (
          //       <li key={booking.id} className="p-4 border rounded">
          //         <p>
          //           <strong>Booker Type:</strong> {booking.bookerType}
          //         </p>
          //         <p>
          //           <strong>Court ID:</strong> {booking.courtAvailabilityId}
          //         </p>
          //         <p>
          //           <strong>User ID:</strong> {booking.userId}
          //         </p>
          //       </li>
          //     ))}
          // </ul>
          <p className="text-gray-500">No bookings found for {bookingType}.</p>
        ))}
    </div>
  );
};

export default BookingsList;

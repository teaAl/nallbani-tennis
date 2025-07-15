import { Booking } from "@/interfaces/booking.interface";
import { UserNT } from "@/interfaces/usernt.interface";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "lucide-react";
import React from "react";

const BookingsTable = ({
  bookings,
  members,
  filter,
  setFilter,
  getUserName,
  getUserEmail,
  getUserPhone,
}: {
  bookings: Booking[];
  members: UserNT[];
  filter: "MEMBER" | "GUEST";
  setFilter: (val: "MEMBER" | "GUEST") => void;
  getUserName: (userId: string) => string;
  getUserEmail: (userId: string) => string;
  getUserPhone: (userId: string) => string;
}) => {
  const filteredBookings = bookings.filter((b) => b.bookerType === filter);
  return (
    <>
      <Tabs
        defaultValue="MEMBER"
        value={filter}
        onValueChange={(val) => setFilter(val as "MEMBER" | "GUEST")}
        className="mb-2"
      >
        <TabsList>
          <TabsTrigger value="MEMBER">Members</TabsTrigger>
          <TabsTrigger value="GUEST">Guests</TabsTrigger>
        </TabsList>
      </Tabs>
      {filteredBookings.length > 0 ? (
        <div className="rounded-md border border-olive/70">
          <Table>
            <TableHeader className="text-gray-900 font-bold uppercase ">
              <TableRow className="bg-olive rounded-t-md">
                <TableHead className="rounded-tl-md">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead className="rounded-tr-md">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-foreground">
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  {booking.bookerType === "MEMBER" ? (
                    <>
                      <TableCell>{getUserName(booking.userId ?? "")}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-3">
                          <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                            <EnvelopeIcon className="w-3 h-3 mr-1" />
                            <a
                              href={`mailto:${getUserEmail(
                                booking.userId ?? ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getUserEmail(booking.userId ?? "")}
                            </a>
                          </span>
                          <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                            <PhoneIcon className="w-3 h-3 mr-1" />
                            <a
                              href={`https://wa.me/${getUserPhone(
                                booking.userId ?? ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getUserPhone(booking.userId ?? "")}
                            </a>
                          </span>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-3">
                          <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                            <EnvelopeIcon className="w-3 h-3 mr-1" />
                            <a
                              href={`mailto:${booking.guestEmail}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {booking.guestEmail}
                            </a>
                          </span>
                          <span className="text-xs text-gray-500 flex flex-row gap-0.5 items-center">
                            <PhoneIcon className="w-3 h-3 mr-1" />
                            <a
                              href={`https://wa.me/${booking.guestPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {booking.guestPhone}
                            </a>
                          </span>
                        </div>
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">No bookings found for {filter}.</p>
      )}
    </>
  );
};

export default BookingsTable;

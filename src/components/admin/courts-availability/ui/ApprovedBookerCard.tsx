import { Booking } from "@/interfaces/booking.interface";
import { UserNT } from "@/interfaces/usernt.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Book, Mail, PhoneCall, Star, UserCircle } from "lucide-react";
import TennisRacket from "../../../../../public/icons/tennisRacket";

const ApprovedBookerCard = ({
  booking,
  members,
}: {
  booking: Booking;
  members: UserNT[];
}) => {
  const isMember = booking.bookerType === "MEMBER";
  const member = isMember ? members.find((m) => m.id === booking.userId) : null;
  return (
    <>
      <div className="rounded-md p-8 shadow-lg bg-white/3 w-max /justify-self-center">
        <div className="flex items-start gap-6">
          <div className="flex flex-col w-max items-center justify-center gap-2 ">
            <Avatar className="w-30 h-full">
              {isMember ? (
                <AvatarImage
                  src={`/images/avatars/${member?.avatar}.jpg`}
                  alt={member?.name}
                />
              ) : (
                <AvatarFallback>
                  <UserCircle className="w-full h-full" />
                </AvatarFallback>
              )}
            </Avatar>
            <div
              className={`text-xs  px-2 py-0.5 rounded
              ${
                isMember
                  ? "bg-pear text-green-800"
                  : "bg-orange-400/70 text-white"
              }
              `}
            >
              {isMember ? "Member" : "Guest"}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 h-full justify-center my-auto border-r border-r-white/5 pr-6">
            <div className="font-medium text-base">
              {isMember && member ? (
                <Link
                  href={`/admin/members/${member.id}`}
                  className="hover:underline"
                >
                  {member.name}
                </Link>
              ) : (
                <span className="text-orange-400">{booking.guestName}</span>
              )}
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
              <Mail className="w-3 h-3" />
              {isMember && member ? member.email : booking.guestEmail}
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
              <PhoneCall className="w-3 h-3" />
              {isMember && member ? member.phoneNumber : booking.guestPhone}
            </div>
          </div>
          <div className="flex flex-col gap-3 h-full justify-center my-auto">
            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
              <TennisRacket size="12" fill="#9ca3af" />
              {booking.needsEquipment
                ? "Needs equipment"
                : "Doesn't need equipment"}
            </div>

            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
              <Star className="w-3 h-3" />
              Booked on:{" "}
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
              ID: <span className="text-white">{booking.id}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovedBookerCard;

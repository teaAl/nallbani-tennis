"use client";

import { MembersList } from "@/components/admin/members/list";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function MembersPage() {
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      // setUsers(data.users);
      console.log("Fetched users:", data);
    };

    fetchUsers().catch((error) => console.error(error));
    // console.log("users on page comp > ", users);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <Link href="admin/members/new">
          <Button className="bg-lime-500 hover:bg-lime-600">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>
      <MembersList />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/memberCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Calendar, UserCog } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useAdminState } from "@/context/adminProvider";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

interface MemberProfileProps {
  id: string;
}

enum UserRole {
  STUDENT = "STUDENT",
  PARENT = "PARENT",
  MEMBER = "MEMBER",
}

export function MemberProfile({ id }: MemberProfileProps) {
  const [user, setUser] = useState<UserNT | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(user?.status);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, status: newStatus }),
      });

      if (!response.ok) {
        console.error("Failed to update status > ", response);
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setUser((prev) => (prev ? { ...prev, status: data.user.status } : null));
      setIsStatusModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    console.log("userRoles > ", userRoles);
    setLoading(true);
    try {
      const response = await fetch("/api/users/update-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, role: userRoles }),
      });

      if (!response.ok) {
        console.error("Failed to update status > ", response);
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setUser((prev) => (prev ? { ...prev, status: data.user.status } : null));
      setIsRoleModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || ""} alt={user?.name} />
            <AvatarFallback className="text-3xl">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <Badge variant="outline">{user?.level}</Badge>
                </div>
                <p className="text-gray-500 mt-1">
                  Member since {formatDate(formatDate(user?.createdAt || ""))}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRoleModalOpen(true)}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Change role
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsStatusModalOpen(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Change status
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-medium text-gray-500">
                  Contact Information
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {user?.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {user?.address}
                  </p>
                </div>
              </div>
              {/* <div>
                <h3 className="font-medium text-gray-500">Emergency Contact</h3>
                <p className="mt-2">{member.emergencyContact}</p>
              </div> */}
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-500">Notes</h3>
              <p className="mt-2">{user?.bio}</p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Modal for changing status */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      >
        <h2 className="text-lg font-bold mb-4">Change Status</h2>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as MemberStatus)}
          className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
        >
          <option value="PENDING">PENDING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="UNCOMPLETE">INCOMPLETE</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsStatusModalOpen(false)}
            className="bg-yellow-50 hover:bg-yellow-100 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            className="bg-pear hover:bg-pear/80 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
            onClick={handleStatusChange}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </Modal>

      {/* Modal for changing role */}
      <Modal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Change Role</h2>
        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={userRoles.includes(UserRole.STUDENT)}
              onChange={(e) => {
                if (e.target.checked) {
                  setUserRoles((prev) => [...prev, UserRole.STUDENT]);
                } else {
                  setUserRoles((prev) =>
                    prev.filter((role) => role !== UserRole.STUDENT)
                  );
                }
              }}
              className="mr-2"
            />
            <label className="text-sm">STUDENT</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={userRoles.includes(UserRole.PARENT)}
              onChange={(e) => {
                if (e.target.checked) {
                  setUserRoles((prev) => [...prev, UserRole.PARENT]);
                } else {
                  setUserRoles((prev) =>
                    prev.filter((role) => role !== UserRole.PARENT)
                  );
                }
              }}
              className="mr-2"
            />
            <label className="text-sm">PARENT</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={userRoles.includes(UserRole.MEMBER)}
              onChange={(e) => {
                if (e.target.checked) {
                  setUserRoles((prev) => [...prev, UserRole.MEMBER]);
                } else {
                  setUserRoles((prev) =>
                    prev.filter((role) => role !== UserRole.MEMBER)
                  );
                }
              }}
              className="mr-2"
            />
            <label className="text-sm">MEMBER</label>
          </div>
        </form>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsRoleModalOpen(false)}
            className="bg-yellow-50 hover:bg-yellow-100 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            className="bg-pear hover:bg-pear/80 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
            onClick={handleRoleChange}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </Modal>
    </Card>
  );
}

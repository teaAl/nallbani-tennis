"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./profileHeader";
import MembershipCard from "./card";
import BookingsList from "./bookingsList";
import ProgressTracker from "./progressTracker";
import ProfileSettings from "./settings";
import NetworkSection from "./network";
import { useAuthStore } from "@/stores/authStore";
import { useMemberStore } from "@/stores/memberStore";

export default function ProfilePage() {
  const { user: fetchedUser, loading: authLoading } = useAuthStore();
  const { members: users, loading: membersLoading } = useMemberStore();

  return (
    <div className="container mx-auto">
      {fetchedUser && <ProfileHeader />}
      <Tabs defaultValue="membership" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="membership" className="mt-6">
          <MembershipCard />
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <BookingsList />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ProgressTracker />
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <NetworkSection users={users} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <ProfileSettings user={fetchedUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { User } from 'next-auth';

// interface MemberContentProps {
//   user?: User;
// }

// export default function MemberContent({ user }: MemberContentProps) {
//   const [activeTab, setActiveTab] = useState('overview');

//   // Client-side interactivity here
//   return (
//     <div>
//       {/* Your dashboard UI */}
//       <div>User ID: {user?.id}</div>
//       {/* More dashboard content */}
//     </div>
//   );
// }

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileHeader from "./profileHeader"
import MembershipCard from "./card"
import BookingsList from "./bookingsList"
import ProgressTracker from "./progressTracker"
import ProfileSettings from "./settings"
import NetworkSection from "./network"

export default function ProfilePage({user}: {user: any}) {
  return (
    <div className="container mx-auto">
      <ProfileHeader
        name="John Doe"
        // email="john.doe@example.com"
        email={user.email}
        joinDate="Member since January 2023"
        avatarUrl="/placeholder.svg?height=100&width=100"
      />

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
          <NetworkSection />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
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
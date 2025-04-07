'use client';

import { useState } from 'react';
import { User } from 'next-auth';

interface MemberContentProps {
  user?: User;
}

export default function MemberContent({ user }: MemberContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Client-side interactivity here
  return (
    <div>
      {/* Your dashboard UI */}
      <div>User ID: {user?.id}</div>
      {/* More dashboard content */}
    </div>
  );
}
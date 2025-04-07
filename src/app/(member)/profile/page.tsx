
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOpts';

import { redirect } from 'next/navigation';
import MemberContent from '@/components/member/memberContent';

export default async function MemberPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, { session.user.email}</h1>
      <MemberContent user={session.user} />
    </div>
  );
}
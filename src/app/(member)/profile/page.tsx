
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
    <>
    <div className="container mx-auto flex items-center justify-center h-full">
      <MemberContent user={session.user} />
    </div>
    </>
  );
}
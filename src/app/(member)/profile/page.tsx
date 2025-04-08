
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
      <h1 className="text-2xl font-bold mb-6 bg-white">header</h1>
    {/* <div className="container mx-auto"> */}
      <MemberContent user={session.user} />
    {/* </div> */}
    </>
  );
}
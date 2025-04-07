import { Metadata } from 'next';
import LoginForm from '@/components/auth/loginForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOpts';

export const metadata: Metadata = {
  title: 'Login | Nallbani Tennis',
  description: 'Login to your Nallbani Tennis account',
};

export default async function LoginPage() {
  // This is a server component, so we can use server-side functions
  const session = await getServerSession(authOptions);
  
  // Redirect to dashboard if already logged in
  if (session) {
    redirect('/');
  }
  
  return (
      <LoginForm />
  );
}
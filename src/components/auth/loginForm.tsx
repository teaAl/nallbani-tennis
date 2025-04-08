'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-[linear-gradient(to_bottom_left,rgba(16,24,40,0.9),rgba(16,24,40,1)),url('/images/ballsbasket.png')] bg-cover bg-no-repeat bg-bottom`}  >
        <Image src="/images/logo-nt.png" alt="Logo" width={100} height={100} className="absolute top-5 left-5" />
        <div className='w-1/3 flex flex-col items-center justify-center gap-10'>
            <h1 className="text-pear text-4xl font-poppins font-bold text-shadow-2xs">Welcome to Nallbani Tennis Club!</h1>
      
        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
            </div>
        )}
      
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="mb-4 w-full">
          <label className="block text-foreground text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-foreground/10 bg-gray-800 rounded-md focus:outline-none focus:shadow-[2px_2px_3px_0px_#cddc3b39] transition-all duration-200 text-foreground"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-foreground text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-foreground/10 bg-gray-800 rounded-md focus:outline-none focus:shadow-[2px_2px_3px_0px_#cddc3b39] transition-all duration-200 text-foreground"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pear text-gray-900 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-pear hover:ring-1 hover:ring-pear focus:outline-none focus:ring-1 focus:ring-pear disabled:bg-gray-500 disabled:text-gray-800 transition-all duration-200 cursor-pointer"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
    <div className='absolute bottom-0 w-full bg-gray-800'>
        <div className='flex flex-row justify-between px-4 py-2 font-nunito text-sm '>
            <span className=" text-pear/90">
                    {/* &copy; {t('rights')} */}
                    &copy; 2025 Nallbani Tennis Club
            </span>
            <span className=" text-pear/90">
                    {/* &copy; {t('rights')} */}
                    &copy; 2025 Nallbani Tennis Club
            </span>
        </div>
    </div>
    {/* <div className="absolute bottom-5 right-5">
        <Image src="/images/tennisball.png" alt="Tennis Ball" width={70} height={70} className="animate-bounce" />
    </div> */}
    </div>
  );
}
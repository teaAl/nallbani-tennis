
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/auth/registerForm';

export default async function RegisterPage() {
  const session = await getSession();
  
  // Redirect to dashboard if already logged in
  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  );
}


// const SignupPage = () => {
//     return (
//         <>
//             <div className="flex flex-col items-center justify-center h-screen login">
//                 <h1 className="text-pear">This is the fucking login page</h1>
//             </div>
//         </>
//     )
// }

// export default SignupPage
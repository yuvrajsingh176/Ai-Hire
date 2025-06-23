'use client'

import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supaBaseClient"
import Image from "next/image"
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col items-center p-8">
          <Image
            src="/logo.png"
            width={160}
            height={60}
            alt="Logo"
            className="mb-6 object-contain"
          />

          <Image
            src="/login.png"
            width={300}
            height={200}
            alt="Login Visual"
            className="rounded-md mb-6 shadow-sm object-cover"
          />

          <div className="text-center space-y-2 mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Welcome</h1>
            <p className="text-sm text-gray-500">Login with your Google account to continue</p>
          </div>

          <Button
            onClick={signInWithGoogle}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 transition rounded-md"
          ><FaGoogle />
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

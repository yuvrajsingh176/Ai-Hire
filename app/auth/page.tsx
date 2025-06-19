'use client'
import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supaBaseClient"
import Image from "next/image"

const login = () => {
  const siginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

  }
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image src='/logo.png' height={60} width={400} alt="logo" className="w-[180px] object-contain rounded-md mb-10" />
        <div className="flex flex-col items-center justify-center border rounded-md ">
          <Image src={'/login.png'} height={400} width={600} alt="logo" className="w-[400px] rounded-md  h-[250px]" />
          <div className="flex flex-col gap-2  items-center text-center  p-10">
            <p className="font-bold text-lg">Welcome Back</p>
            <p className="text-gray-400">Login with your Google account</p>
            <Button onClick={siginWithGoogle} className="mt-4 w-full cursor-pointer">Login With Google</Button></div>
        </div>
      </div>
    </div>
  )
}

export default login

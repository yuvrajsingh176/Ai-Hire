'use client';

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supaBaseClient";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import {  Sparkles } from "lucide-react";

const Login = () => {
  const signInWithGoogle = async () => {
    // Note: In production you would probably have a redirect URL configured.
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative overflow-hidden px-4 selection:bg-primary/20 selection:text-primary">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 size-64 md:size-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 size-64 md:size-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 transition-all animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl shadow-primary/5 overflow-hidden">

          <div className="flex flex-col items-center p-8 md:p-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 group cursor-default">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="Logo"
                className="rounded-xl shadow-sm transition-transform duration-500 group-hover:rotate-12"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900 leading-none">AI Hire</span>
            </div>


            {/* Header Text */}
            <div className="text-center space-y-2 mb-10">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Step into your future</h1>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
                Join thousands of candidates using AI to master their career path.
              </p>
            </div>

            {/* Google Button */}
            <Button
              onClick={signInWithGoogle}
              className="w-full h-14 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold text-base transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-3 active:scale-95 cursor-pointer ring-offset-2 ring-primary/20 focus:ring-2"
            >
              <FaGoogle className="text-primary size-5" />
              Continue with Google
            </Button>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-gray-100 w-full">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles className="size-3.5 fill-primary/20 animate-pulse" />
                <span>Powered by GPT-4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <p className="text-center mt-8 text-xs text-gray-400 font-medium px-8 leading-relaxed">
          By continuing, you agree to AI Hire&apos;s <span className="text-gray-600 hover:text-primary transition-colors cursor-pointer underline decoration-gray-300">Terms of Service</span> and <span className="text-gray-600 hover:text-primary transition-colors cursor-pointer underline decoration-gray-300">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;

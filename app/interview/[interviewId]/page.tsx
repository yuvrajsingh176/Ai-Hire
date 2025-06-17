import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Video } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Interview = () => {
  return (
    <div className="px-6 md:px-28 lg:px-48 xl:px-64 py-8 ">
      <div className="flex flex-col items-center justify-center border px-4 py-8 lg:px-32 xl:px-52 rounded-2xl bg-white shadow-md space-y-6 mb-20 ">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          height={100}
          width={100}
          className="w-[100px] h-[100px] p-2 rounded-full border"
        />

        {/* Heading */}
        <p className="text-lg text-primary font-semibold">AI-Powered Interview Platform</p>

        {/* Illustration */}
        <Image
          src="/illustration.png"
          alt="illustration"
          height={500}
          width={800}
          className="w-[800px]  my-2 rounded-md"
        />

        {/* Interview Info */}
        <div className="text-center">
          <h1 className="font-bold text-2xl text-gray-800">
            Full Stack Developer Interview
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 mt-1">
            <Clock className="size-4" />
            <p>30 Minutes</p>
          </div>
        </div>

        {/* Input Field */}
        <div className="w-full space-y-2 text-start">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Enter your full name
          </label>
          <Input
            id="name"
            placeholder="e.g. John Cena"
            className="p-4 rounded-lg text-base"
          />
        </div>

        {/* Instructions */}
        <div className="w-full text-start space-y-2 mt-4">
          <h2 className="text-md font-semibold text-gray-800">
            📋 Before You Begin
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Ensure you have a stable internet connection.</li>
            <li>Find a quiet, well-lit place for the interview.</li>
            <li>Test your camera and microphone before starting.</li>
          </ul>
        </div>
        <Button className='mt-5 w-full font-bold'>
          <Video />
          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;

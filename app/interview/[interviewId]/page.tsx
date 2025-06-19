'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InterviewDataContext } from '@/context/InterviewDataContetext';
import { supabase } from '@/services/supaBaseClient';
import { Clock, Loader2, Video } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface InterviewDetails {
  duration: string,
  jobDescription: string,
  jobPosition: string,
  type: string,
  questionList: string[],
  userName:string,
  userEmail:string,
  
}

const Interview = () => {
  const { interviewId } = useParams();
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails>();
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const context = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    getInterviewDetails(interviewId as string)
  }, [interviewId])






  const getInterviewDetails = async (interviewId: string) => {
    setLoading(true);
    try {
      const { data: Interviews, } = await supabase
        .from('Interviews')
        .select('*')
        .eq('interview_id', interviewId);

      if (Interviews) {
        setInterviewDetails(Interviews[0])
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast('Incorrect interview link')
    }
  }
  if (!context) {
    // Fallback or error
    return <div>No interview context provided.</div>;
  }
  const { setInterviewInfo } = context;

  const onJoinInterview = async () => {
    setLoading(true);

    const { data: Interviews } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interviewId);

    if (Interviews) {
      setInterviewInfo({ ...Interviews[0], userName, userEmail });
      router.push('/interview/' + interviewId + '/start')
    }
    setLoading(false)

  }



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
            {interviewDetails?.jobPosition}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 mt-1">
            <Clock className="size-4" />
            <p>
              {interviewDetails?.duration}
            </p>
          </div>
        </div>

        {/* Input Field */}
        <div className="w-full space-y-2 text-start">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Enter your full name
          </label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            id="name"
            placeholder="e.g. John Cena"
            className="p-4 rounded-lg text-base"
            value={userName}
          />
        </div>

        {/* Input Field */}
        <div className="w-full space-y-2 text-start">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Enter your email
          </label>
          <Input
            onChange={(e) => setUserEmail(e.target.value)}
            id="email"
            placeholder="e.g. johncena@gmail.com"
            className="p-4 rounded-lg text-base"
            value={userEmail}
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
        <Button onClick={() => onJoinInterview()} disabled={loading || !userName || !userEmail} className='mt-5 w-full font-bold'>
          {
            loading ?
              <Loader2 className='animate-spin' />
              :
              <Video />
          }

          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;

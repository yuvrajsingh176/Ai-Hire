'use client'
import { Button } from '@/components/ui/button';
import { UserDetailContext } from '@/context/userContext'
import { supabase } from '@/services/supaBaseClient'
import { ArrowRight, Copy, Plus, Send, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export type InterviewFeedback = {
    jobPosition: string;
    duration: string;
    interview_id: string;
    "interview-feedback": {
        userEmail: string;
    }[];
    created_at: string;
};


const ScheduledInterview = () => {
    const { user } = useContext(UserDetailContext);
    const [interviewList, setInterviewList] = useState<InterviewFeedback[]>([])
    const router = useRouter();

    const GetInterviewList = async (email: string) => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,duration,created_at,interview_id,interview-feedback(userEmail)')
            .eq('userEmail', email)
            .order('id', { ascending: false });

        setInterviewList(result.data as InterviewFeedback[])
    }
    useEffect(() => {
        GetInterviewList(user?.email)
    }, [user?.email])

    return (
        <div className='mt-5'>
            <p className='font-bold text-xl'>Interview list with candidate feedback</p>
            {interviewList?.length === 0 &&
                <div className="p-5 mt-5 flex flex-col gap-3 items-center bg-white border ">
                    <Video className="h-10 w-10 text-primary " />
                    <h2>You don&apos;t have any interview scheduled yet</h2>
                    <Button className="cursor-pointer" onClick={() => router.push('/dashboard/create-interview')}>Create New Interview <Plus /></Button>
                </div>
            }
            <div className="flex flex-wrap gap-6 my-6">
                {
                    interviewList?.map((val: InterviewFeedback, index) => (
                        <div className="border rounded-md bg-white p-6 h-full flex flex-col gap-4 " key={index}>
                            <div className="flex justify-between gap-10">
                                <p className="text-primary font-bold">
                                    {val?.jobPosition}
                                </p>
                                <p>{new Date(val?.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>
                                    {val?.duration}
                                </p>
                                <p className='text-green-700'>{val?.['interview-feedback'].length} {val?.['interview-feedback'].length > 1 ? 'Candidates' : 'Candidate'} </p>
                            </div>
                            <Button className='w-full cursor-pointer' variant={'outline'}>
                                View Detail <ArrowRight />
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ScheduledInterview

'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Interview } from '../dashboard/_components/LatestInterviewList';
import { supabase } from '@/services/supaBaseClient';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/userContext';
import { Button } from '@/components/ui/button';
import { Copy, Send } from 'lucide-react';
import { toast } from 'sonner';

const AllInterview = () => {
    const [copy, setCopy] = useState('')
    const { user } = useContext(UserDetailContext);
    const router = useRouter();
    const [interviewList, setInterviewList] = useState<Interview[]>([]);

    const GetInterviews = async (email: string) => {

        const { data: Interviews, } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', email)
            .order('id', { ascending: false })

        setInterviewList(Interviews as Interview[])
    }

    const handleCopy = async (code: string, id: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopy(id);
            setTimeout(() => setCopy(''), 4000);
            toast.success('Link Copied')
        } catch (err) {
            console.error('Failed to copy: ', err);
            setCopy('')
        }
    };

    useEffect(() => {
        GetInterviews(user?.email)
    }, [user?.email])

    return (
        <div>
            <p className='font-bold text-primary text-4xl text-center w-full my-8'>
                All Interviews
            </p>
            <div className="flex flex-wrap gap-6">
                {
                    interviewList?.map((val: Interview, index) => (
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
                            <p>{val?.duration.toUpperCase()}</p>
                            <div className="flex gap-10 justify-between">
                                <Button onClick={() => handleCopy(process.env.NEXT_PUBLIC_HOST_URL + `/` + val?.interview_id, val?.interview_id)} className="cursor-pointer" variant={'outline'}>
                                    <Copy />
                                    {copy === val.interview_id ? 'Copied' : 'Copy'}
                                </Button>
                                <Button className="cursor-pointer" onClick={() => router.push(`/interview/` + val?.interview_id)}>
                                    <Send />
                                    Visit
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllInterview
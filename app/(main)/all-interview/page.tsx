'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Interview } from '../dashboard/_components/LatestInterviewList'
import { supabase } from '@/services/supaBaseClient'
import { useRouter } from 'next/navigation'
import { UserDetailContext } from '@/context/userContext'
import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

const AllInterview = () => {
    const [copy, setCopy] = useState('')
    const { user } = useContext(UserDetailContext)
    const router = useRouter()
    const [interviewList, setInterviewList] = useState<Interview[]>([])

    const GetInterviews = async (email: string) => {
        const { data: Interviews } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', email)
            .order('id', { ascending: false })

        setInterviewList(Interviews as Interview[])
    }

    const handleCopy = async (code: string, id: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopy(id)
            setTimeout(() => setCopy(''), 4000)
            toast.success('Link Copied')
        } catch (err) {
            console.error('Failed to copy: ', err)
            setCopy('')
        }
    }

    useEffect(() => {
        if (user?.email) GetInterviews(user.email)
    }, [user?.email])

    return (
        <div className=" py-10">
            <h1 className="text-4xl font-bold text-primary text-center mb-12">
                All Interviews
            </h1>

            {interviewList?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {interviewList.map((val: Interview, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl bg-white shadow-md p-6 flex flex-col gap-4 transition hover:shadow-lg"
                        >
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <p className="font-semibold text-primary">{val?.jobPosition}</p>
                                <p>
                                    {new Date(val?.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>

                            <p className="text-gray-700 font-medium uppercase text-sm">{val?.duration}</p>

                            <div className="flex gap-4 mt-auto">
                                <Button
                                    onClick={() =>
                                        handleCopy(
                                            `${process.env.NEXT_PUBLIC_HOST_URL}/${val?.interview_id}`,
                                            val?.interview_id
                                        )
                                    }
                                    variant="outline"
                                    className="flex gap-2 items-center w-1/2 cursor-pointer justify-center"
                                >
                                    <Copy size={16} />
                                    {copy === val.interview_id ? 'Copied' : 'Copy'}
                                </Button>

                                <Button
                                    onClick={() => router.push(`/interview/${val?.interview_id}`)}
                                    className="flex gap-2 items-center w-1/2 cursor-pointer justify-center"
                                >
                                    <Send size={16} />  
                                    Visit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-8 text-center text-gray-500 space-y-6">
                    <Image height={500} width={500} src="/empty.png" alt="No interviews" className="w-auto h-auto opacity-80" />
                    <p className="text-xl font-semibold text-gray-700">No interviews found</p>
                    <p className="text-sm text-gray-400">
                        Once you complete interviews, they will appear here.
                    </p>
                </div>
            )}
        </div>
    )
}

export default AllInterview

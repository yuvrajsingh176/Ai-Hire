'use client'
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/userContext";
import { supabase } from "@/services/supaBaseClient";
import { Copy, Plus, Send, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type Interview = {
    id: number;
    created_at: string; // ISO date string
    jobPosition: string;
    jobDescription: string;
    duration: string;
    type: string[]; // originally a stringified array, should be parsed to actual array
    questionList: string[];
    userEmail: string;
    interview_id: string;
};


const LatestInterviewList = ({ copy, setCopy }: { copy: string, setCopy: Dispatch<SetStateAction<string>> }) => {

    const { user } = useContext(UserDetailContext);
    const router = useRouter();
    const [interviewList, setInterviewList] = useState<Interview[]>([]);

    const GetInterviews = async (email: string) => {

        const { data: Interviews, } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', email)
            .order('id', { ascending: false })
            .limit(6)

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
        GetInterviews(user?.email as string)
    }, [user?.email])

    return (
        <div className="my-5 ">
            <h2 className="font-bold text-2xl my-3">Previously created interviews</h2>
            {interviewList?.length === 0 &&
                <div className="p-5 mt-5 flex flex-col gap-3 items-center bg-white border ">
                    <Video className="h-10 w-10 text-primary " />
                    <h2>You don&apos;t have any interview scheduled yet</h2>
                    <Button className="cursor-pointer" onClick={() => router.push('/dashboard/create-interview')}>Create New Interview <Plus /></Button>
                </div>
            }
            <div className="flex flex-wrap gap-6 ">
                {
                    interviewList?.map((val: Interview, index) => (
                        <div className="border rounded-md bg-white p-2 px-3 h-[150px] w-[350px] flex flex-col  justify-around " key={index}>
                            <div className="flex justify-between gap-10">
                                <p className="text-primary font-bold overflow-ellipsis">
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
                                <Button className={"cursor-pointer"} onClick={() => router.push(`/interview/` + val?.interview_id)}>
                                    <Send />
                                    Visit
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default LatestInterviewList;

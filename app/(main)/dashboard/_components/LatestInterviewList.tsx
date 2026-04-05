'use client'
import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/userContext";
import { supabase } from "@/services/supaBaseClient";
import { Calendar, Copy, ExternalLink, Plus, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type Interview = {
    id: number;
    created_at: string;
    jobPosition: string;
    jobDescription: string;
    duration: string;
    type: string[];
    questionList: string[];
    userEmail: string;
    interview_id: string;
};

const LatestInterviewList = ({ copy, setCopy }: { copy: string, setCopy: Dispatch<SetStateAction<string>> }) => {
    const { user } = useContext(UserDetailContext);
    const router = useRouter();
    const [interviewList, setInterviewList] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);

    const GetInterviews = async (email: string) => {
        setLoading(true);
        const { data: Interviews } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', email)
            .order('id', { ascending: false })
            .limit(6)
        setInterviewList(Interviews as Interview[])
        setLoading(false);
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
        <div className="my-2">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-gray-900">Recent Interviews</h2>
                {interviewList.length > 0 && (
                    <button
                        onClick={() => router.push('/all-interview')}
                        className="text-sm text-primary font-medium hover:underline"
                    >
                        View all
                    </button>
                )}
            </div>

            {/* Loading skeletons */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="rounded-2xl border bg-white p-5 animate-pulse space-y-3">
                            <div className="h-4 w-2/3 bg-gray-100 rounded" />
                            <div className="h-3 w-1/3 bg-gray-100 rounded" />
                            <div className="h-8 w-full bg-gray-100 rounded-lg mt-4" />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && interviewList?.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                        <Video className="size-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-base">No interviews yet</h3>
                    <p className="text-gray-400 text-sm mt-1 mb-5">Create your first AI interview to get started</p>
                    <Button
                        className="cursor-pointer gap-2"
                        onClick={() => router.push('/dashboard/create-interview')}
                    >
                        <Plus className="size-4" />
                        Create Interview
                    </Button>
                </div>
            )}

            {/* Interview cards */}
            {!loading && interviewList?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interviewList.map((val: Interview, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl border border-border bg-white p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Header */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Video className="size-4 text-primary" />
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Calendar className="size-3" />
                                    {new Date(val?.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>

                            {/* Job info */}
                            <div>
                                <p className="font-semibold text-gray-900 truncate">{val?.jobPosition}</p>
                                <span className="inline-block mt-1 text-xs font-medium bg-primary/8 text-primary px-2 py-0.5 rounded-full">
                                    {val?.duration}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
                                <Button
                                    onClick={() => handleCopy(
                                        `${process.env.NEXT_PUBLIC_HOST_URL}/${val?.interview_id}`,
                                        val?.interview_id
                                    )}
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 gap-1.5 cursor-pointer text-xs"
                                >
                                    <Copy className="size-3" />
                                    {copy === val.interview_id ? 'Copied!' : 'Copy Link'}
                                </Button>
                                <Button
                                    onClick={() => router.push(`/interview/${val?.interview_id}`)}
                                    size="sm"
                                    className="flex-1 gap-1.5 cursor-pointer text-xs"
                                >
                                    <ExternalLink className="size-3" />
                                    Visit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LatestInterviewList;

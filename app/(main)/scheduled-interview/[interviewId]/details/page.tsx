'use client'
import { UserDetailContext } from '@/context/userContext';
import { supabase } from '@/services/supaBaseClient';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import InterviewDetailCont from './_components/InterviewDetailCont';
import CandidateList from './_components/CandidateList';

export type InterviewSummary = {
    jobPosition: string;
    duration: string;
    created_at: string; // ISO date string
    interview_id: string;
    "interview-feedback": {
        userEmail: string;
    }[];
    type: string;
    jobDescription: string;
    questionList: string[]
};
export type InterviewFeedbackEntry = {
    feedback: {
        rating: {
            experience: number;
            communication: number;
            problemSolving: number;
            technicalSkills: number;
        };
        summary: string;
        recommendation: string;
        recommendationMsg: string;
    };
    userName: string;
    userEmail: string;
    recommended: boolean;
    created_at:string;
};


const InterviewDetails = () => {
    const { interviewId } = useParams();
    const { user } = useContext(UserDetailContext);
    const [interviewDetail, setInterviewDetail] = useState<InterviewSummary>();



    const GetInterviewList = async (email: string) => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,jobDescription,duration,questionList,created_at,interview_id,type,interview-feedback(userEmail,userName,feedback, created_at,recommended)')
            .eq('userEmail', email)
            .eq('interview_id', interviewId);
        setInterviewDetail(result.data[0] as InterviewSummary)
    }

    useEffect(() => {
        GetInterviewList(user?.email)
    }, [user?.email])



    return (
        <div>
            <p className='font-bold mb-6 text-2xl'>Interview Detail</p>
            <InterviewDetailCont interviewDetail={interviewDetail as InterviewSummary} />
            <CandidateList candidateList={interviewDetail?.['interview-feedback'] as InterviewFeedbackEntry[]} />

        </div>
    )
}

export default InterviewDetails 

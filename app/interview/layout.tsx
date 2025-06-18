'use client'
import React, { ReactNode, useState } from 'react'
import Header from './_components/Header'
import { InterviewDataContext } from '@/context/InterviewDataContetext'
import { InterviewDetails } from './[interviewId]/page'

const InterviewLayout = ({ children }: { children: ReactNode }) => {
    const [interviewInfo, setInterviewInfo] = useState<InterviewDetails | undefined>()
    return (
        <InterviewDataContext value={{ interviewInfo, setInterviewInfo }}>
            <div className='bg-secondary '>
                <Header />
                {children}
            </div>
        </InterviewDataContext>
    )
}

export default InterviewLayout
import React, { ReactNode } from 'react'
import Header from './_components/Header'

const InterviewLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-secondary '>
            <Header />
            {children}
        </div>
    )
}

export default InterviewLayout
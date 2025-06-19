
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const InterviewCompleted = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Interview Completed</h1>
                <p className="text-gray-700 mb-6">
                    Thank you for completing the interview.
                </p>
                {/* Replace src with your actual image path */}
                <div className="w-full h-64 relative">
                    <Image
                        src="/interview-completed.png" // <-- change this to your desired image
                        alt="Interview Completed"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
            <div className='mt-4 flex items-center justify-center'>
                <Link href={'/dashboard'}>
                    <Button >
                        Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewCompleted

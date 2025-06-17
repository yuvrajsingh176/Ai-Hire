'use client'

import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'

export type FormDataType = {
    // Define the actual fields you're collecting in your form
    jobPosition?: string
    jobDescription?: string
    interviewDuration?: string
    interviewType?: string[]
}

const CreateInterview: React.FC = () => {
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [formData, setFormdata] = useState<FormDataType>({})

    const onHandleInputChange = (field: keyof FormDataType, value: string | string[]) => {
        setFormdata((prev) => ({
            ...prev,
            [field]: value,
        }))
    }
    const goToNext = () => {
        if (!formData.interviewDuration || !formData?.interviewType || !formData.jobDescription || !formData.jobPosition) {
            toast('Please fill all of the details');
            return;
        }
        setStep(prev => prev + 1)
    }

    return (
        <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-2 justify-start items-center text-center'>
                <ArrowLeft onClick={() => router.back()} className='font-bold cursor-pointer' />
                <p className='font-bold text-2xl'>Create New Interview</p>
            </div>
            <Progress value={step * 33.33333} className='my-5' />
            {
                step === 1 ? <FormContainer
                    step={step}
                    setStep={goToNext}
                    formData={formData}
                    onHandleInputChange={onHandleInputChange}
                /> : step === 2 ? <QuestionList   formData={formData} /> : null
            }
        </div>
    )
}

export default CreateInterview

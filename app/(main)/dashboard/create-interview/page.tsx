'use client'

import { Progress } from '@/components/ui/progress'
import { ArrowLeft, FileText, Link2, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'

export type FormDataType = {
    jobPosition?: string
    jobDescription?: string
    interviewDuration?: string
    interviewType?: string[]
}

const steps = [
    { id: 1, label: 'Job Details', icon: FileText },
    { id: 2, label: 'AI Questions', icon: Sparkles },
    { id: 3, label: 'Share Link', icon: Link2 },
]

const CreateInterview: React.FC = () => {
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [formData, setFormdata] = useState<FormDataType>({});
    const [interviewId, setInterviewId] = useState('')

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

    const onCreateLink = (interview_id: string) => {
        setInterviewId(interview_id)
        setStep((prev) => prev + 1)
    }

    const progressValue = ((step - 1) / (steps.length - 1)) * 100;

    return (
        <div className='max-w-3xl mx-auto py-4'>
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-6 cursor-pointer'
            >
                <ArrowLeft className='size-4' />
                Back
            </button>

            {/* Header */}
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-gray-900'>Create New Interview</h1>
                <p className='text-gray-500 text-sm mt-1'>Set up an AI-powered interview in 3 simple steps</p>
            </div>

            {/* Step indicators */}
            <div className='flex items-center gap-0 mb-3'>
                {steps.map((s, i) => {
                    const Icon = s.icon;
                    const isComplete = step > s.id;
                    const isActive = step === s.id;
                    return (
                        <React.Fragment key={s.id}>
                            <div className='flex items-center gap-2'>
                                <div className={`
                                    flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all
                                    ${isComplete ? 'bg-primary text-white' : isActive ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-gray-100 text-gray-400'}
                                `}>
                                    {isComplete ? '✓' : <Icon className='size-3.5' />}
                                </div>
                                <span className={`text-sm font-medium hidden sm:block ${isActive ? 'text-primary' : isComplete ? 'text-gray-700' : 'text-gray-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${step > s.id ? 'bg-primary' : 'bg-gray-200'}`} />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>

            {/* Progress bar */}
            <Progress value={progressValue} className='h-1 mb-8' />

            {/* Step content */}
            <div className='animate-in fade-in slide-in-from-bottom-2 duration-300'>
                {step === 1 && (
                    <FormContainer
                        step={step}
                        setStep={goToNext}
                        formData={formData}
                        onHandleInputChange={onHandleInputChange}
                    />
                )}
                {step === 2 && (
                    <QuestionList
                        formData={formData}
                        onCreateLink={(interview_id: string) => onCreateLink(interview_id)}
                    />
                )}
                {step === 3 && (
                    <InterviewLink interviewId={interviewId} formData={formData} />
                )}
            </div>
        </div>
    )
}

export default CreateInterview

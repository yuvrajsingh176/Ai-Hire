'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InterviewType } from '@/services/Constants';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FormDataType } from '../page';

const FormContainer = ({  setStep,onHandleInputChange }: {
    step: number, setStep: () => void,
    formData: FormDataType, onHandleInputChange: (field: keyof FormDataType, value: string | string[]) => void
}) => {

    const [interviewType, setInterviewType] = useState<string[]>([]);

    useEffect(() => {
        onHandleInputChange('interviewType', interviewType);
    }, [interviewType])



    return (
        <div className='p-5 bg-white rounded-md flex flex-col gap-5'>
            <div>
                <h2 className='text-sm mb-2 font-medium '>Job Position</h2>
                <Input onChange={(e) => onHandleInputChange('jobPosition', e.target.value)} placeholder='eg. Full stack developer' />
            </div>
            <div>
                <h2 className='text-sm mb-2 font-medium '>Job Description</h2>
                <Textarea onChange={(e) => onHandleInputChange('jobDescription', e.target.value)} placeholder='Enter detail of the job description' className='h-[200px] ' />
            </div>

            <div>
                <h2 className='text-sm mb-2 font-medium '>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1 min">1 min</SelectItem>
                        <SelectItem value="15 mins">15 mins</SelectItem>
                        <SelectItem value="30 mins">30 mins</SelectItem>
                        <SelectItem value="45 mins">45 mins</SelectItem>
                        <SelectItem value="60 mins">60 mins</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <h2 className='text-sm mb-2 font-medium '>Interview Type</h2>
                <div className='flex flex-wrap gap-3 '>
                    {
                        InterviewType.map((type) => (
                            <div onClick={() => setInterviewType((prev) => {
                                if (prev.includes(type.title)) {
                                    return prev.filter((data) => data !== type.title)
                                } else {
                                    return [...prev, type.title]
                                }
                            })} className={`${interviewType.includes(type.title) ? 'bg-primary text-white' : "bg-blue-50"} flex items-center cursor-pointer hover:transform-3d gap-2 p-1 px-2   rounded-2xl border border-gray-300 w-fit`} key={type.title}>
                                <type.icon className='size-4' />
                                <span>{type.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='mt-7 flex justify-end'>
                <Button onClick={() => setStep()} className='cursor-pointer'>Generate Question <ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer;

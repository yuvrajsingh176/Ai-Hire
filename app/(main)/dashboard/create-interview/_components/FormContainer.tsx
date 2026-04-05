'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InterviewType } from '@/services/Constants';
import { ArrowRight, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FormDataType } from '../page';

const durations = [
    { value: '1 min', label: '1 minute — Quick check' },
    { value: '15 mins', label: '15 minutes — Brief screen' },
    { value: '30 mins', label: '30 minutes — Standard' },
    { value: '45 mins', label: '45 minutes — In-depth' },
    { value: '60 mins', label: '60 minutes — Full interview' },
]

const FormContainer = ({ setStep, onHandleInputChange }: {
    step: number, setStep: () => void,
    formData: FormDataType, onHandleInputChange: (field: keyof FormDataType, value: string | string[]) => void
}) => {
    const [interviewType, setInterviewType] = useState<string[]>([]);

    useEffect(() => {
        onHandleInputChange('interviewType', interviewType);
    }, [interviewType])

    return (
        <div className='bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8 flex flex-col gap-6'>

            {/* Job Position */}
            <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-gray-800'>Job Position</label>
                <p className='text-xs text-gray-400 -mt-1'>e.g. Senior Frontend Developer</p>
                <Input
                    onChange={(e) => onHandleInputChange('jobPosition', e.target.value)}
                    placeholder='Full Stack Developer'
                    className='mt-1 h-11'
                />
            </div>

            {/* Job Description */}
            <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-gray-800'>Job Description</label>
                <p className='text-xs text-gray-400 -mt-1'>Paste the JD or describe the role responsibilities</p>
                <Textarea
                    onChange={(e) => onHandleInputChange('jobDescription', e.target.value)}
                    placeholder='We are looking for a developer who...'
                    className='mt-1 min-h-[160px] resize-none'
                />
            </div>

            {/* Duration */}
            <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-gray-800'>
                    <Clock className='size-3.5 inline mr-1.5 text-primary' />
                    Interview Duration
                </label>
                <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
                    <SelectTrigger className="w-full h-11 mt-1">
                        <SelectValue placeholder="Choose duration" />
                    </SelectTrigger>
                    <SelectContent>
                        {durations.map((d) => (
                            <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Interview Type */}
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-gray-800'>Interview Type</label>
                <p className='text-xs text-gray-400 -mt-1'>Select one or more that apply</p>
                <div className='flex flex-wrap gap-2 mt-1'>
                    {InterviewType.map((type) => {
                        const selected = interviewType.includes(type.title);
                        return (
                            <button
                                key={type.title}
                                type='button'
                                onClick={() => setInterviewType((prev) =>
                                    prev.includes(type.title)
                                        ? prev.filter((d) => d !== type.title)
                                        : [...prev, type.title]
                                )}
                                className={`
                                    flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                                    border transition-all duration-150 cursor-pointer
                                    ${selected
                                        ? 'bg-primary text-white border-primary shadow-sm'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                                    }
                                `}
                            >
                                <type.icon className='size-3.5' />
                                {type.title}
                                {selected && <span className='ml-1 text-white/80 text-xs'>✓</span>}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Submit */}
            <div className='flex justify-end pt-2 border-t border-border/50'>
                <Button onClick={() => setStep()} className='cursor-pointer gap-2 h-11 px-6'>
                    Generate Questions
                    <ArrowRight className='size-4' />
                </Button>
            </div>
        </div>
    )
}

export default FormContainer;

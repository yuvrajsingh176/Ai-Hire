'use client';

import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Loader2Icon, Timer } from 'lucide-react';
import { InterviewDataContext } from '@/context/InterviewDataContetext';
import Vapi from '@vapi-ai/web';
import AlertComponent from './_components/AlertComponent';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supaBaseClient';
import { useParams, useRouter } from 'next/navigation';
import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import TimerComp from './_components/TimerComp';

const StartInterview = () => {
    const [activeUser, setActiveUser] = useState(false);
    const conversationRef = useRef(null);
    const [callStart, setCallstart] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [loading, setLoading] = useState(false);

    const vapiRef = useRef<Vapi | null>(null);
    const { interviewId } = useParams();
    const router = useRouter();

    const context = useContext(InterviewDataContext);

    const GenerateFeedback = useCallback(async () => {
        setLoading(true)
        try {
            const conversation = conversationRef.current;

            if (!conversation) {
                console.error('No conversation data captured.');
                toast.error('Interview ended too early — no conversation recorded.');
                setLoading(false);
                return;
            }
            // Send conversation to your feedback API
            const res = await axios.post('/api/ai-feedback', { conversation });
            const content = res?.data;
            if (!content) {
                throw new Error("No content returned from feedback API.");
            }

            // Clean and parse the JSON string (remove backticks, whitespace, etc.)
            const cleanedContent = content
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            const parsedFeedback = JSON.parse(cleanedContent);

            // Insert into Supabase
            const { error } = await supabase
                .from('interview-feedback')
                .insert([
                    {
                        userName: context?.interviewInfo?.userName,
                        userEmail: context?.interviewInfo?.userEmail,
                        interview_id: interviewId,
                        feedback: parsedFeedback.feedback,
                        recommended: (() => {
                            const rec = parsedFeedback?.feedback?.recommendation;
                            if (typeof rec === 'boolean') return rec;
                            if (typeof rec === 'string') {
                                const v = rec.toUpperCase().trim();
                                return v === 'TRUE' || v === 'RECOMMENDED';
                            }
                            return false;
                        })(),
                    }
                ])
                .select();

            if (error) {
                throw new Error(`Supabase insert error: ${error.message}`);
            }

            router.replace('/interview/' + interviewId + '/completed');
            setLoading(false)
        } catch (err) {
            console.error('Feedback generation failed:', err);
            toast.error('Failed to generate feedback.');
        }
    }, [interviewId, context?.interviewInfo?.userEmail, context?.interviewInfo?.userName, router]);

    useEffect(() => {
        if (!vapiRef.current) {
            vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
        }

        const vapi = vapiRef.current;

        vapi.on('speech-start', () => setActiveUser(false));
        vapi.on('speech-end', () => setActiveUser(true));

        vapi.on('call-start', () => {
            setCallstart(true);
            setConnecting(false);
            toast('Your Interview Has Started 🚀');
        });

        vapi.on('call-end', () => {
            toast('Your Interview Has Ended 🏁');
            setCallstart(false);
            setTimeout(() => {
                GenerateFeedback();
            }, 1000);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vapi.on('error', (error: any) => {
            console.error('Vapi error:', error);
            toast.error(`Vapi error: ${error?.message || JSON.stringify(error)}`);
            setCallstart(false);
            setConnecting(false);
            setLoading(false);
        });

        vapi.on('message', (message) => {
            if (message?.conversation !== undefined) {
                conversationRef.current = message.conversation;
            }
        });

        return () => {
            vapi.removeAllListeners();
        };
    }, [GenerateFeedback]);

    if (!context) {
        return <div>No interview context provided.</div>;
    }

    const { interviewInfo } = context;

    const startInterviewCall = async () => {
        if (connecting || callStart) return; // prevent double-click
        setConnecting(true);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });

            const questionList = interviewInfo?.questionList.join(', ') ?? '';

            const assistantOptions = {
                name: "AI Recruiter",
                firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.jobPosition}?`,
                transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-US",
                },
                voice: {
                    provider: "openai",
                    voiceId: "alloy",
                },
                model: {
                    provider: "openai",
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin with a friendly intro. Example: "Hey there! Welcome to your ${interviewInfo?.jobPosition} interview. Let's get started!"
Ask one question at a time.
Questions: ${questionList}
Encourage responses, give feedback like: "Nice! That's solid." or "Want a hint?"
After 5-7 questions, wrap up. Example: "Great work! Keep sharpening your skills!"
Be friendly, engaging, and natural.
`.trim(),
                        },
                    ],
                },
            };

            vapiRef.current?.start(assistantOptions as CreateAssistantDTO);
        } catch (error) {
            console.error('Mic access error:', error);
            toast.error("Microphone permission denied. Please allow mic access to begin.");
            setConnecting(false);
        }
    };

    const stopInterview = () => {
        vapiRef.current?.stop();
    };

    return (
        <div className="p-10 lg:px-48 xl:py-28 xl:px-56 min-h-[100vh] ">
            <h2 className="flex justify-between items-center font-bold text-xl">
                AI Interview Session
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    {
                        callStart ? <TimerComp stopInterview={stopInterview} duration={interviewInfo?.duration || ''} /> : <div className='flex items-center text-center gap-1'>
                            <Timer className="w-4 h-4" />
                            {interviewInfo?.duration}
                        </div>
                    }
                </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-6">
                {/* AI Interviewer */}
                <div className="flex flex-col items-center justify-center h-[400px] bg-white border rounded-lg shadow-sm">
                    <div className='relative'>
                        {!activeUser && (
                            <span className={` ${callStart && 'bg-blue-500 opacity-75 animate-ping'} absolute inset-0 rounded-full `}></span>
                        )}
                        <Image
                            src="/interviewr.png"
                            alt="interviewr"
                            height={100}
                            width={100}
                            className="w-[100px] h-[100px] object-cover rounded-full"
                        />
                    </div>
                    <h2 className="mt-4 text-lg font-medium">AI Interviewer</h2>
                </div>

                {/* User */}
                <div className="flex flex-col items-center justify-center h-[400px] bg-white border rounded-lg shadow-sm">
                    <div className='relative'>
                        {activeUser && (
                            <span className={`absolute inset-0 rounded-full ${callStart && 'bg-blue-500 opacity-75 animate-ping'}`}></span>
                        )}
                        <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-primary text-white text-2xl font-bold">
                            {interviewInfo?.userName?.[0] ?? 'H'}
                        </div>
                    </div>
                    <h2 className="mt-4 text-lg font-medium">{interviewInfo?.userName}</h2>
                </div>
            </div>


            {callStart && (<div className={`flex my-10 justify-center gap-6 ${loading && 'hidden'}`}>
                <AlertComponent stopInterview={stopInterview}>
                    <Button className='bg-red-700 text-white cursor-pointer'>End Interview</Button>
                </AlertComponent>
            </div>)}

            {!callStart && (
                <div className={`flex my-10 justify-center gap-6 ${loading && 'hidden'}`}>
                    <Button
                        onClick={startInterviewCall}
                        disabled={connecting}
                        className='cursor-pointer min-w-[160px]'
                    >
                        {connecting ? (
                            <><Loader2Icon className='animate-spin mr-2' /> Connecting...</>
                        ) : (
                            'Start Interview'
                        )}
                    </Button>
                </div>
            )}

            {
                loading && (
                    <div className='flex justify-center items-center w-full'>
                        <Loader2Icon className='animate-spin size-10' />

                    </div>
                )
            }


            {callStart && <h2 className='text-sm text-gray-400 text-center mt-5 pb-4'>
                Interview is in progress...
            </h2>}
        </div >
    );
};

export default StartInterview;

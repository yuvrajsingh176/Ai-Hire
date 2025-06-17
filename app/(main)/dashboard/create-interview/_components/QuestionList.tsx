'use client'
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from "react"
import { FormDataType } from "../page"
import axios from 'axios';
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supaBaseClient";
import { UserDetailContext } from "@/context/userContext";

const QuestionList = ({ formData, onCreateLink }: {
    formData: FormDataType, onCreateLink: (interview_id: string) => void
}) => {

    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [lists, setList] = useState([]);
    const { user } = useContext(UserDetailContext);

    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const resp = await axios.post('/api/ai-model', {
                jobTitle: formData.jobPosition,
                jobDescription: formData.jobDescription,
                type: formData.interviewType,
                duration: formData.interviewDuration
            });
            setList(resp?.data?.questions);
            setLoading(false);
        } catch (e: any) {
            setLoading(false);

            toast('Failed try again');
        }

    }

    const onFinish = async () => {
        setSaveLoading(true)
        try {
            const interview_id = uuidv4();

            const { data, error } = await supabase
                .from('Interviews')
                .insert([
                    {
                        jobPosition: formData.jobPosition, jobDescription: formData.jobDescription, duration: formData.interviewDuration, type: formData.interviewType, questionList: lists,
                        userEmail: user.email, interview_id: interview_id
                    },
                ])
                .select()
            console.log(data);
            setSaveLoading(false);

            onCreateLink(
                interview_id,
            )

        } catch (e) {
            console.log(e)
            toast('Error while saving data😔');
            setSaveLoading(false);
        }


    }

    // useEffect(() => {
    //     GenerateQuestionList()
    // }, [formData]);

    if (loading) {
        return <div className='flex flex-col justify-center items-center'>
            <Loader2Icon className="animate-spin" />
            <div className="p-5 bg-blue-100 rounded-xl border  border-primary flex flex-col gap-5 items-center ">
                <h2 className="font-medium">Generating Interview Questions🫷🔃</h2>
                <h2 className="text-primary">Our AI is crafting most challenging and real world questions for you🚀</h2>
            </div>
        </div>
    }

    return (
        <div>
            <p className="my-5 font-bold text-xl">Generated Interview Questions</p>
            <div className="p-5 border border-gray-300 rounded-xl bg-white ">
                {
                    lists.map((val, index) => (
                        <div className="p-3 border border-gray-200 rounded-xl mb-3" key={index}>
                            <p className="font-medium ">
                                {val}
                            </p>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-end mt-10">
                <Button onClick={() => onFinish()} disabled={saveLoading}>
                    {saveLoading &&
                        <Loader2Icon className='animate-spin' />
                    }
                    Create Interview Link & Finish
                </Button>
            </div>
        </div>
    )
}

export default QuestionList

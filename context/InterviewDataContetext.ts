import { InterviewDetails } from "@/app/interview/[interviewId]/page";
import { createContext } from "react";


type InterviewDetailsContextType = {
    interviewInfo: InterviewDetails | undefined;
    setInterviewInfo: (interview: InterviewDetails) => void; // optional setter if needed
};
export const InterviewDataContext = createContext<InterviewDetailsContextType | null>(null)
'use client'
import { Calendar, Clock } from "lucide-react"
import { InterviewSummary } from "../page";
import moment from 'moment';
import { useEffect, useState } from "react";

const InterviewDetailCont = ({ interviewDetail }: { interviewDetail: InterviewSummary }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    if (interviewDetail?.type) {
      const parsed = JSON.parse(interviewDetail?.type);
      setType(parsed.join(','))
    }
  }, [interviewDetail?.type])

  return (
    <div className="p-6 bg-white rounded-lg mt-5 ">
      <h2 className="font-bold text-lg mt-4">
        {interviewDetail?.jobPosition}
      </h2>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-xs text-gray-500">Duration</h2>
          <h2 className="flex text-sm items-center gap-2  font-semibold mt-1"><Clock className="size-4 " />{interviewDetail?.duration}</h2>
        </div>
        <div>
          <h2 className="text-xs text-gray-500">Created On</h2>
          <h2 className="flex text-sm items-center gap-2 font-semibold mt-1 "><Calendar className="size-4 " />{moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</h2>
        </div>
        <div>
          <h2 className="text-xs text-gray-500">Type</h2>
          <h2 className="flex text-sm items-center gap-2  font-semibold mt-1  "><Clock className="size-4 " />{type}</h2>
        </div>
      </div>
      <div className="mt-4 ">
        <p className="font-bold text-lg">Job Description</p>
        <p className="leading-6">{interviewDetail?.jobDescription}</p>
      </div>

      <div className="mt-4 ">
        <p className="font-bold text-lg">Question List</p>
        <ul className="list-disc pl-5">
          {interviewDetail?.questionList.map((question, ind) => (
            <li className="my-1" key={ind}>
              {question}
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default InterviewDetailCont
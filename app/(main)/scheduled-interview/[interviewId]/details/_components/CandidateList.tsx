import moment from "moment"
import { InterviewFeedbackEntry } from "../page"
import { Button } from "@/components/ui/button"
import ReportDialog from "./ReportDialog"

const CandidateList = ({ candidateList }: { candidateList: InterviewFeedbackEntry[] }) => {

    return (
        <div className="p-6 bg-white rounded-lg mt-5 ">
            <p className="font-bold my-5">Candidates ({candidateList?.length})</p>

            <div>
                {
                    candidateList?.map((candidate, index) => (
                        <div key={index} className=" flex gap3 items-center justify-between bg-white rounded-lg gap-4">
                            <div className="flex items-center  gap-3">
                                <h2 className="bg-primary w-fit  px-6 font-bold text-white rounded-full p-4">{candidate?.userName[0]}</h2>
                                <div>
                                    <h3 className="font-bold ">{candidate?.userName}</h3>
                                    <h2 className="text-sm text-gray-500">Completed on {moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ReportDialog candidate={candidate}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CandidateList

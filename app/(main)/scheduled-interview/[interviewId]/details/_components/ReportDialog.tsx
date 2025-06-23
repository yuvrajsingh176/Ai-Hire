import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InterviewFeedbackEntry } from "../page"
import { Progress } from "@/components/ui/progress"

const ReportDialog = ({ candidate }: { candidate: InterviewFeedbackEntry }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className="text-primary cursor-pointer">View Report</Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription asChild>
                            <div className="flex flex-col gap-10 mt-10 p-8 border rounded-2xl shadow-lg bg-white md:flex-row md:items-start">

                                {/* Candidate Info + Rating */}
                                <div className="flex flex-col gap-6 w-full md:w-1/3">
                                    <div className="flex items-center gap-5">
                                        {/* Avatar */}
                                        <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                                            {candidate?.userName?.[0]}
                                        </div>

                                        {/* Name & Email */}
                                        <div>
                                            <h3 className="font-bold text-xl">{candidate?.userName}</h3>
                                            <p className="text-sm text-gray-500">{candidate?.userEmail}</p>
                                        </div>
                                    </div>

                                    {/* Overall Rating */}
                                    <div className="mt-2">
                                        <p className="text-primary text-3xl font-bold">
                                            {candidate?.feedback
                                                ? `${(
                                                    (candidate.feedback.rating.experience +
                                                        candidate.feedback.rating.communication +
                                                        candidate.feedback.rating.problemSolving +
                                                        candidate.feedback.rating.technicalSkills) / 4
                                                ).toFixed(1)}/10`
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Skill Assessment */}
                                <div className="w-full md:w-1/3 space-y-6">
                                    <p className="font-bold text-lg">Skill Assessment</p>
                                    <div className="space-y-5">
                                        {[
                                            { label: 'Technical Skills', value: candidate?.feedback?.rating.technicalSkills },
                                            { label: 'Communication', value: candidate?.feedback?.rating.communication },
                                            { label: 'Problem Solving', value: candidate?.feedback?.rating.problemSolving },
                                            { label: 'Experience', value: candidate?.feedback?.rating.experience }
                                        ].map((skill, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span>{skill.label}</span>
                                                    <span>{skill.value ?? 0}/10</span>
                                                </div>
                                                <Progress value={(skill.value ?? 0) * 10} className="mt-1 h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback Summary & Recommendation */}
                                <div className="w-full md:w-1/3 space-y-6">
                                    {/* Summary */}
                                    <div className="space-y-2">
                                        <p className="font-bold text-lg">Progress Summary</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {candidate?.feedback?.summary}
                                        </p>
                                    </div>

                                    {/* Recommendation */}
                                    <div
                                        className={`p-6 rounded-xl shadow-md text-white font-medium ${candidate?.feedback?.recommendation === 'FALSE' ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                    >
                                        <h2 className="text-lg mb-1">Recommendation</h2>
                                        <p className="text-sm">{candidate?.feedback?.recommendationMsg}</p>
                                    </div>
                                </div>

                            </div>
                        </DialogDescription>


                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReportDialog
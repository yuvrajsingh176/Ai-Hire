'use client'
import { useState } from "react"
import CreateOptions from "./_components/CreateOptions"
import LatestInterviewList from "./_components/LatestInterviewList"

const Dashboard = () => {
    const [copy, setCopy] = useState<string>('')

    return (
        <div className="w-full space-y-2">
            <CreateOptions />
            <LatestInterviewList copy={copy} setCopy={setCopy} />
        </div>
    )
}

export default Dashboard

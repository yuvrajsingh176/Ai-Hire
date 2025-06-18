'use client'
import { useState } from "react"
import CreateOptions from "./_components/CreateOptions"
import LatestInterviewList from "./_components/LatestInterviewList"

const Dashboard = () => {
    const [copy, setCopy] = useState<string>('')

    return (
        <div className="w-full">
            <p className="text-2xl font-bold my-4">Dashboard</p>
            <CreateOptions />
            <LatestInterviewList copy={copy} setCopy={setCopy} />
        </div>
    )
}

export default Dashboard

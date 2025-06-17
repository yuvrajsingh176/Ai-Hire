import CreateOptions from "./_components/CreateOptions"
import LatestInterviewList from "./_components/LatestInterviewList"

const Dashboard = () => {
    return (
        <div className="w-full">
            <p className="text-2xl font-bold my-4">Dashboard</p>
            <CreateOptions />
            <LatestInterviewList />
        </div>
    )
}

export default Dashboard

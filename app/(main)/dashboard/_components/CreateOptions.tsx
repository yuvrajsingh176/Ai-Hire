'use client'
import { Phone, Video } from "lucide-react"
import { useRouter } from "next/navigation"

const CreateOptions = () => {

    const router = useRouter();

    return (
        <div className="flex justify-between md:gap-18 gap-2">
            <div onClick={() => router.push('/dashboard/create-interview')} className="rounded-lg cursor-pointer h-full border-gray-200 p-5 bg-white w-1/2 ">
                <Video className=" text-primary bg-blue-50 p-3 size-12 rounded-lg " />
                <h2 className="font-bold  mt-4" >Create New Interview</h2>
                <p className="text-gray-500">Create AI interviews and schedule them with candidates</p>
            </div>
            <div className="rounded-lg border-gray-200 p-5 bg-white w-1/2 ">
                <Phone className=" text-primary bg-blue-50 p-3 size-12 rounded-lg " />
                <h2 className="font-bold mt-4">Create Phone Screaning Call</h2>
                <p className="text-gray-500">Schedule phone screening call with candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions

'use client'
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react"

const LatestInterviewList = () => {
    const [list, setList] = useState([1, 2, 3, 4]);
    const router = useRouter();
    return (
        <div className="my-5 ">
            <h2 className="font-bold text-2xl my-3">Previously created interviews</h2>
            {list?.length > 0 &&
                <div className="p-5 mt-5 flex flex-col gap-3 items-center bg-white ">
                    <Video className="h-10 w-10 text-primary " />
                    <h2>You don&apos;t have any interview scheduled yet</h2>
                    <Button className="cursor-pointer" onClick={() => router.push('/dashboard/create-interview')}>Create New Interview <Plus /></Button>
                </div>
            }
        </div>
    )
}

export default LatestInterviewList;

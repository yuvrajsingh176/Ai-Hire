'use client'
import Image from "next/image"
import { FormDataType } from "../page"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Copy, List, Plus, UserCog } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"


const InterviewLink = ({ interviewId, formData }: { interviewId: string, formData: FormDataType }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interviewId

  const GetInterviewUrl = () => {
    return url;
  }

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Interview link copied to clipboard')
  }



  return (
    <div className="flex flex-col  w-full justify-center items-center mt-10">
      <Image src={'/checked.png'} height={200} width={200} alt="checked" className="w-[50px] h-[50px]" />
      <h2 className="font-bold text-xl mt-4">
        Your interview with AI is ready🥳🎆
      </h2>
      <p className="mt-3">Share this link to start the interview process🤝 </p>
      <div className="w-full p-7 mt-6 rounded-lg  bg-white ">
        <div className=" flex justify-between  items-center ">
          <h2 className="font-bold">
            Interview Link
          </h2>
          <h2 className="p-1 px-2 text-primary bg-blue-100 rounded-md">
            Valid for 30Days
          </h2>

        </div>
        <div className=" flex items-center justify-between gap-2 mt-4 ">
          <Input className="text-primary md:text-xl  text-base font-semibold" defaultValue={GetInterviewUrl()} disabled={true} />
          <Button className="cursor-pointer" onClick={() => onCopyLink()}><Copy /> Copy Link</Button>
        </div>
        <hr className="my-7" />
        <div className="flex justify-between md:justify-center md:gap-10 items-center text-center ">
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><Clock className="h-4  w-4" /> {formData.interviewDuration}</h2>
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><List className="h-4  w-4" /> {formData.interviewType?.join(',')}</h2>
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><UserCog className="h-4  w-4" /> {formData.jobPosition}</h2>

        </div>
      </div>

      <div className="flex flex-col  md:flex-row gap-4 md:gap-0 w-full  justify-center  md:justify-end   mt-8">
        <Link href={'/create-interview'} className="w-full h-full md:mr-6 md:w-fit">
          <Button className="cursor-pointer w-full"><Plus />Create new Interview</Button>
        </Link>
        <Link href={'/dashboard'} className=" w-full h-full md:w-fit">
          <Button className="cursor-pointer w-full" variant={'outline'}><ArrowLeft />Back to Dashboard </Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink

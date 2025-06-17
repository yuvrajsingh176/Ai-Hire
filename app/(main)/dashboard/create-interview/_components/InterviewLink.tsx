'use client'
import Image from "next/image"
import { FormDataType } from "../page"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Copy, List, Plus, UserCog } from "lucide-react"
import { FaSlack, FaWhatsapp } from "react-icons/fa";
import Link from "next/link"
import { MdEmail } from "react-icons/md";
import { toast } from "sonner"


const InterviewLink = ({ interviewId, formData }: { interviewId: string, formData: FormDataType }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interviewId

  const GetInterviewUrl = () => {
    return url;
  }

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast('Interview link copied to clipboard')
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
          <Input className="text-primary text-2xl  font-semibold" defaultValue={GetInterviewUrl()} disabled={true} />
          <Button className="cursor-pointer" onClick={() => onCopyLink()}><Copy /> Copy Link</Button>
        </div>
        <hr className="my-7" />
        <div className="flex gap-5 ">
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><Clock className="h-4  w-4" /> {formData.interviewDuration}</h2>
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><List className="h-4  w-4" /> {formData.interviewType?.join(',')}</h2>
          <h2 className="text-xs text-gray-500 flex gap-2 items-center "><UserCog className="h-4  w-4" /> {formData.jobPosition}</h2>

        </div>
      </div>
      <div className="mt-10 bg-white rounded-2xl shadow-sm w-full">
        <h2 className="font-bold text-lg text-gray-800 mb-4 px-6 pt-6 text-center">Share Via</h2>

        <div className="flex flex-col  justify-between items-center w-full px-6 pb-6 gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full md:w-1/3 justify-center py-5 text-sm cursor-pointer"
          >
            <MdEmail size={20} />
            <span className="font-medium">Email</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 w-full md:w-1/3 justify-center py-5 text-sm cursor-pointer"
          >
            <FaSlack size={20} />
            <span className="font-medium">Slack</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 w-full md:w-1/3 justify-center py-5 text-sm cursor-pointer"
          >
            <FaWhatsapp size={20} />
            <span className="font-medium">WhatsApp</span>
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-5 justify-between mt-8">
        <Link href={'/dashboard'}>
          <Button className="cursor-pointer" variant={'outline'}><ArrowLeft />Back to Dashboard </Button>
        </Link>
        <Link href={'/create-interview'}>
          <Button className="cursor-pointer"><Plus />Create new Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink

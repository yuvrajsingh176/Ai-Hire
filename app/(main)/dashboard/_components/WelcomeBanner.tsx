'use client'
import { UserDetailContext } from "@/context/userContext"
import { supabase } from "@/services/supaBaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import { toast } from "sonner";

const WelcomeBanner = () => {
    const { user } = useContext(UserDetailContext);
    const router = useRouter();
    const [showSignout, setShowSignout] = useState(false);
    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success('You have been logged out')
        router.push('/')
    }

    return (
        <div onClick={(e) => {
            e.stopPropagation()
            setShowSignout(false)
        }} >
            <div className="rounded-md relative  flex py-6 md:px-10 px-2 bg-white justify-between w-full items-center border">
                <p className="text-xl font-semibold">Welcome back,<span className="text-primary">{user?.name}</span></p>
                {
                    user?.picture && (
                        <Image onClick={(e) => {
                            e.stopPropagation()
                            setShowSignout(!showSignout)
                        }} src={user.picture} alt="User avatar" height={50} width={50} className="rounded-full cursor-pointer" />

                    )
                }
                {showSignout && <div onClick={() => {
                    signOut();
                }} className="absolute cursor-pointer  md:right-4 right-[-10px] border top-20 rounded-2xl p-4 bg-white ">
                    Log Out
                </div>}
            </div>
        </div>
    )
}

export default WelcomeBanner

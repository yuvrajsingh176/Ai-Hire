'use client'
import { UserDetailContext } from "@/context/userContext"
import Image from "next/image";
import { useContext } from "react"

const WelcomeBanner = () => {
    const { user } = useContext(UserDetailContext);
    return (
        <div className="rounded-md flex py-6 px-10 bg-white justify-between w-full items-center border">
            <p className="text-xl font-semibold">Welcome back,<span className="text-primary">{user?.name}</span></p>
            {
                user?.picture && (
                    <Image src={user.picture} alt="User avatar" height={50} width={50} className="rounded-full" />

                )
            }
        </div>
    )
}

export default WelcomeBanner

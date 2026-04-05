'use client'
import { UserDetailContext } from "@/context/userContext"
import { supabase } from "@/services/supaBaseClient";
import { LogOut, Sparkles } from "lucide-react";
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

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div onClick={() => setShowSignout(false)} className="mb-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-6 py-6 md:px-10 md:py-8 shadow-lg">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-8 right-32 h-32 w-32 rounded-full bg-white/10 blur-xl" />

                <div className="relative flex items-center justify-between">
                    {/* Left: greeting */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="text-yellow-300 size-4" />
                            <span className="text-white/80 text-sm font-medium">{greeting}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            {user?.name ?? 'Welcome back'} 👋
                        </h1>
                        <p className="text-white/70 text-sm mt-1">
                            Ready to run smarter interviews today?
                        </p>
                    </div>

                    {/* Right: avatar + signout */}
                    <div className="relative flex items-center gap-3">
                        {user?.picture && (
                            <div className="relative">
                                <Image
                                    onClick={(e) => { e.stopPropagation(); setShowSignout(!showSignout); }}
                                    src={user.picture}
                                    alt="User avatar"
                                    height={48}
                                    width={48}
                                    className="rounded-full ring-2 ring-white/50 cursor-pointer hover:ring-white transition-all"
                                />
                                {/* Online dot */}
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-primary" />
                            </div>
                        )}

                        {showSignout && (
                            <div
                                onClick={(e) => { e.stopPropagation(); signOut(); }}
                                className="absolute right-0 top-14 z-50 flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2.5 text-white text-sm hover:bg-white/20 transition-colors shadow-xl"
                            >
                                <LogOut className="size-4" />
                                Sign out
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBanner

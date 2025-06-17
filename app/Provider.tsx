'use client'
import { UserDetailContext } from "@/context/userContext";
import { supabase } from "@/services/supaBaseClient"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    //if user exits?
    const [user, setUser] = useState();
    const router = useRouter();


    // useEffect(() => {
    //     if (user) {
    //         router.push('/dashboard')
    //     }
    // }, [user])

    const CreateNewUser = () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            let { data: User, error } = await supabase
                .from('User')
                .select("*")
                .eq('email', user?.email);

            if (User?.length === 0) {
                const { data, } = await supabase.from('User')
                    .insert([
                        {
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture
                        }
                    ])
                setUser(data);
                return;
            }
            setUser(User[0])
        })
    }

    useEffect(() => {
        CreateNewUser();
    }, [])

    //no then create user

    return (
        <UserDetailContext value={{ user, setUser }}>
            {children}
        </UserDetailContext>
    )
}

export default Provider


export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}
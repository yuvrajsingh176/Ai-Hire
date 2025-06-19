'use client';

import { UserDetailContext, User } from "@/context/userContext";
import { supabase } from "@/services/supaBaseClient";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const CreateNewUser = () => {
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (!user?.email) return;

            const { data: existingUsers } = await supabase
                .from('User')
                .select("*")
                .eq('email', user.email);

            if (!existingUsers || existingUsers.length === 0) {
                const { data: newUser } = await supabase.from('User')
                    .insert([
                        {
                            name: user.user_metadata?.name,
                            email: user.email,
                            picture: user.user_metadata?.picture
                        }
                    ])
                    .select();

                if (newUser && newUser.length > 0) {
                    setUser(newUser[0]);

                    // Redirect if on home page
                    if (window.location.pathname === '/') {
                        router.push('/dashboard');
                    }
                }
            } else {
                setUser(existingUsers[0]);

                // Redirect if on home page
                if (window.location.pathname === '/') {
                    router.push('/dashboard');
                }
            }
        });
    };

    useEffect(() => {
        CreateNewUser();
    }, []);

 
    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            {children}
        </UserDetailContext.Provider>
    );
};

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    if (!context) throw new Error("useUser must be used within a UserDetailContext.Provider");
    return context;
};

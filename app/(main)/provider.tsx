import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'
import { AppSidebar } from './_components/Appsidebar';
import WelcomeBanner from './dashboard/_components/WelcomeBanner';

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-secondary'>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full p-10 mx-18'>
                    {/* <SidebarTrigger /> */}
                    <WelcomeBanner/>
                    {children}
                </main>
            </SidebarProvider>

        </div>
    )
}

export default DashboardProvider;

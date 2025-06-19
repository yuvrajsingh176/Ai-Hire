'use client'
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOpt } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const path = usePathname();


    return (
        <Sidebar>
            <SidebarHeader className="flex items-center mt-5" >
                <Image src={'/logo.png'} height={100} width={200} className="w-[150px] rounded-md" alt="Logo" />
                <Link href={'https://ai-hire-taupe.vercel.app/dashboard/create-interview'}>
                    <Button className="w-full mt-5 h-12">Create New Interview <Plus /></Button>

                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarContent>
                        <SidebarMenu className="gap-6 mt-8">
                            {
                                SideBarOpt.map((item) => (
                                    <Link href={item.path} key={item.name}>
                                        <SidebarMenuItem className={`${path === item.path && "text-primary font-semibold border-primary"} flex gap-2 items-center p-2 border rounded-md bg-white hover:bg-primary hover:shadow hover:text-white`} >
                                            <item.icon />
                                            <p>
                                                {item.name}
                                            </p>
                                        </SidebarMenuItem></Link>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
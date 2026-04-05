'use client'
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
import { Plus, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const path = usePathname();

    return (
        <Sidebar className="border-r border-border/60 bg-white">
            {/* Header */}
            <SidebarHeader className="px-5 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-6">
                    <Image
                        src={'/logo.png'}
                        height={40}
                        width={40}
                        className="rounded-xl"
                        alt="Logo"
                    />
                    <div>
                        <p className="font-bold text-gray-900 text-base leading-tight">AI Hire</p>
                        <p className="text-xs text-gray-400">Interview Platform</p>
                    </div>
                </div>

                {/* CTA Button */}
                <Link href={'/dashboard/create-interview'}>
                    <button className="
                        w-full flex items-center justify-center gap-2
                        rounded-xl bg-primary text-white text-sm font-semibold
                        px-4 py-3 shadow-sm
                        hover:bg-primary/90 hover:shadow-md
                        active:scale-[0.98]
                        transition-all duration-200
                        cursor-pointer
                    ">
                        <Plus className="size-4" />
                        Create Interview
                    </button>
                </Link>
            </SidebarHeader>

            {/* Nav */}
            <SidebarContent className="px-3">
                <SidebarGroup>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-2 mt-2">
                        Menu
                    </p>
                    <SidebarMenu className="gap-1">
                        {SideBarOpt.map((item) => {
                            const isActive = path.includes(item.path);
                            return (
                                <Link href={item.path} key={item.name}>
                                    <SidebarMenuItem
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                                            transition-all duration-150 cursor-pointer
                                            ${isActive
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-primary/8 hover:text-primary'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            flex items-center justify-center size-8 rounded-lg
                                            ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-primary/10'}
                                        `}>
                                            <item.icon className="size-4" />
                                        </div>
                                        <span>{item.name}</span>

                                        {/* Active indicator dot */}
                                        {isActive && (
                                            <span className="ml-auto size-1.5 rounded-full bg-white/80" />
                                        )}
                                    </SidebarMenuItem>
                                </Link>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="px-5 py-4 border-t border-border/40">
                <div className="flex items-center gap-2 rounded-xl bg-primary/5 border border-primary/10 px-3 py-2.5">
                    <Sparkles className="size-4 text-primary flex-shrink-0" />
                    <div>
                        <p className="text-xs font-semibold text-gray-800">AI-Powered</p>
                        <p className="text-[11px] text-gray-400">Interviews by GPT-4</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
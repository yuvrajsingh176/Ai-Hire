'use client'
import { ArrowRight, Phone, Video } from "lucide-react"
import { useRouter } from "next/navigation"

const options = [
    {
        icon: Video,
        title: 'Create New Interview',
        description: 'Generate AI-powered interviews and share them with candidates instantly.',
        action: '/dashboard/create-interview',
        gradient: 'from-primary/10 to-primary/5',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        badge: 'Popular',
        clickable: true,
    },
    {
        icon: Phone,
        title: 'Phone Screening Call',
        description: 'Schedule automated phone screening calls with your candidates.',
        action: null,
        gradient: 'from-violet-50 to-purple-50/50',
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-500',
        badge: 'Coming soon',
        clickable: false,
    },
]

const CreateOptions = () => {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {options.map((opt) => {
                const Icon = opt.icon;
                return (
                    <div
                        key={opt.title}
                        onClick={() => opt.clickable && opt.action && router.push(opt.action)}
                        className={`
                            group relative overflow-hidden rounded-2xl border border-border bg-white
                            p-6 transition-all duration-300
                            ${opt.clickable
                                ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30'
                                : 'opacity-70 cursor-default'}
                        `}
                    >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} opacity-60`} />

                        <div className="relative">
                            {/* Top row: icon + badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${opt.iconBg} p-3 rounded-xl`}>
                                    <Icon className={`${opt.iconColor} size-6`} />
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                                    ${opt.badge === 'Popular'
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-gray-100 text-gray-500'}`}>
                                    {opt.badge}
                                </span>
                            </div>

                            {/* Text */}
                            <h2 className="font-bold text-gray-900 text-base mb-1">{opt.title}</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">{opt.description}</p>

                            {/* CTA */}
                            {opt.clickable && (
                                <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                                    Get started <ArrowRight className="size-4" />
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CreateOptions

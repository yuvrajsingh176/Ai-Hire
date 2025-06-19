'use client';

import { Button } from "@/components/ui/button";
import { Rocket, Bot, CalendarCheck, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white text-gray-900 ">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pb-24 px-6 bg-gradient-to-br from-blue-50 to-blue-100">

        <header className="w-full justify-between flex items-center p-4" >
          <Image src='/logo.png' height={60} width={400} alt="logo" className="w-[100px] object-contain rounded-md" />
          <Button className="px-6 py-3 text-lg cursor-pointer" onClick={() => router.push('/auth')}>Start Interview</Button>

        </header>
        <h1 className="text-5xl font-bold mb-4">
          AI-Powered Mock Interviews
        </h1>
        <p className="text-lg max-w-xl mb-6 text-gray-700">
          Practice job interviews with an intelligent AI that gives instant feedback and improves your confidence.
        </p>
        <Button className="px-6 py-3 text-lg cursor-pointer" onClick={() => router.push('/auth')}>Start Interview</Button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Use Our Platform?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <Feature icon={<Bot />} title="AI Interviewer" desc="Simulates real interviewers using GPT-based AI." />
          <Feature icon={<CalendarCheck />} title="Flexible Practice" desc="Practice anytime, anywhere at your convenience." />
          <Feature icon={<ThumbsUp />} title="Real-Time Feedback" desc="Get instant, actionable insights on your responses." />
          <Feature icon={<Rocket />} title="Boost Confidence" desc="Improve your skills and ace real interviews with ease." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Success Stories</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <Testimonial
            name="Anjali R."
            text="The AI feedback was super helpful—felt like a real interview! Helped me land my dream role."
          />
          <Testimonial
            name="Rahul M."
            text="I used this platform every day for a week and my confidence improved dramatically."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-10 text-center text-sm">
        &copy; {new Date().getFullYear()} AIHIRE
      </footer>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <p className="text-gray-800 italic mb-2">“{text}”</p>
      <span className="text-blue-600 font-medium">— {name}</span>
    </div>
  );
}

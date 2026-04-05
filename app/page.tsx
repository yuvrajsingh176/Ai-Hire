'use client';

import { Button } from "@/components/ui/button";
import { Sparkles, Bot, Clock, BarChart3, MoveRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 border-gray-100 shadow-sm' : 'bg-transparent py-5 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Image src='/logo.png' height={40} width={40} alt="logo" className="rounded-xl shadow-sm" />
             <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:inline-block">AI Hire</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => router.push('/auth')}>Sign In</Button>
            <Button className="px-5 py-5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer" onClick={() => router.push('/auth')}>
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 size-64 md:size-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 size-64 md:size-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default">
                <Sparkles className="size-4 text-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI-Powered Interviews</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Ace Your Next Interview with <span className="text-primary bg-clip-text">AI Excellence</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Experience realistic interview simulations, receive instant AI-driven coaching, and master the art of conversation to land your dream career.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button onClick={() => router.push('/auth')} className="px-10 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 gap-2 cursor-pointer w-full sm:w-auto">
                  Start Practice Now <MoveRight className="size-5" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 px-6 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Designed to help you master the professional talk</h3>
            <p className="text-gray-500 text-lg">Our platform combines cutting-edge AI with proven interview techniques to prepare you for any scenario.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Bot />} 
              title="State-of-the-art AI" 
              desc="Our GPT-powered engine understands nuances, providing a conversational experience that feels eerily human." 
            />
            <FeatureCard 
              icon={<Clock />} 
              title="On-Demand Practice" 
              desc="No scheduling needed. Open your laptop at 3:00 AM and have a full technical interview ready in seconds." 
            />
            <FeatureCard 
              icon={<BarChart3 />} 
              title="Granular Analytics" 
              desc="Break down your performance with ratings for tone, clarity, body language, and technical accuracy." 
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f0f4f8]/50 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Impact Stories</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900">Joining the thousands who secured their future</h3>
            </div>
            <Button variant="outline" className="rounded-full px-8 py-6 cursor-pointer hover:bg-white transition-all shadow-sm">View all stories</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Anjali R."
              role="Software Engineer @ Google"
              text="The AI feedback was brutally honest—exactly what I needed! It caught my filler words and pointed out where my technical explanations hit a wall. I felt 10x more prepared."
              image="https://i.pravatar.cc/150?u=anjali"
            />
            <TestimonialCard
              name="Marcus T."
              role="Product Manager @ Meta"
              text="I was struggling with behavioral questions. Practice rounds here helped me structure my STAR responses perfectly. This tool basically paid for itself after my first offer."
              image="https://i.pravatar.cc/150?u=marcus"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto rounded-[3rem] bg-gray-900 p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-gray-900/40">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-20 -translate-y-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full -translate-x-20 translate-y-20 pointer-events-none" />
            
            <div className="relative text-center max-w-2xl mx-auto">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to ace your <span className="text-primary italic">next dream</span> interview?</h2>
               <p className="text-gray-400 text-lg mb-10">Sign up today and get your first 3 interview simulations absolutely free. No credit card required.</p>
               <Button onClick={() => router.push('/auth')} className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-8 text-xl font-black rounded-3xl transition-transform hover:scale-105 shadow-xl shadow-white/10 cursor-pointer w-full sm:w-auto">
                 Join AI HIre Now
               </Button>
               <p className="mt-8 text-xs text-gray-500 font-medium">Free for individuals • High priority support • GPT-4 Turbo</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 <Image src='/logo.png' height={32} width={32} alt="logo" className="rounded-lg shadow-sm" />
                 <span className="font-extrabold text-xl tracking-tight text-gray-900">AI Hire</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">The world&apos;s most advanced AI-powered platform for professional interview preparation and career coaching.</p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => <div key={i} className="size-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer"><div className="size-4 bg-gray-400 rounded-sm" /></div>)}
              </div>
           </div>
           
           <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                 <li className="hover:text-primary transition-colors cursor-pointer">AI Interviewer</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Mock Calls</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Scorecard</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Career Path</li>
              </ul>
           </div>
           
           <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                 <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                 <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
              </ul>
           </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          <span>&copy; {new Date().getFullYear()} AI HIre Inc. All Rights Reserved.</span>
          <div className="flex items-center gap-2">
             <div className="size-2 rounded-full bg-green-500 animate-pulse" />
             <span>Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className={`group p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-default hover:-translate-y-2`}>
      <div className="size-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 shadow-sm group-hover:rotate-6 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">{desc}</p>
      <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
         Learn more <ArrowRight className="size-4" />
      </div>
    </div>
  );
}

function TestimonialCard({ name, role, text, image }: { name: string; role: string; text: string; image: string }) {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group cursor-default relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-primary/10 absolute -top-4 -right-4 size-32 font-black italic select-none">“</div>
      <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed font-medium">“{text}”</p>
      <div className="flex items-center gap-4 relative z-10">
        <div className="size-14 rounded-full overflow-hidden border-2 border-primary/10 p-0.5 group-hover:border-primary group-hover:scale-105 transition-all duration-500">
           <Image src={image} alt={name} width={56} height={56} className="size-full rounded-full" />
        </div>
        <div>
          <h4 className="text-gray-900 font-bold leading-tight group-hover:text-primary transition-colors">{name}</h4>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{role}</span>
        </div>
      </div>
    </div>
  );
}

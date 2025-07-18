"use client"

import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";
import FadeWrapper from "@/components/FadeWrapper";
import UseCases from "@/components/Usecase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()

  return (
    <FadeWrapper>
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden  bg-gradient-to-br from-background via-background to-primary/5">
        {/* Animated Glow Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-52 h-52 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-30 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Hero Section */}
        <section className="z-10 flex flex-col items-center justify-center w-full min-h-screen pt-10 px-6 bg-primary/5">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Interview Platform
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl text-muted-foreground">
            Experience the future of technical interviews with our voice-based
            AI interviewer. Get real-time feedback and improve your skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-10">
            <Button className="px-8 py-7 text-black font-semibold text-lg rounded-xl bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(0,255,255,0.5)] transition-all duration-300" onClick={()=>router.push("/interviews")}>
              Start Interviewing
            </Button>
            <Button className="bg-transparent rounded-xl px-8 py-7 text-primary font-semibold text-lg border border-primary transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-primary/15">
              Learn More
            </Button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="z-10 w-full max-w-7xl mt-16 px-6 ">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Revolutionary AI technology meets intuitive design for the ultimate
            interview experience.
          </p>
          <Cards />
        </section>

        {/* Use Cases */}
        <section className="z-10 w-full mt-12 px-6">
          <UseCases />
        </section>
      </div>
    </FadeWrapper>
  );
}

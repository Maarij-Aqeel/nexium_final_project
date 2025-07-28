"use client";

import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";
import FadeWrapper from "@/components/FadeWrapper";
import UseCases from "@/components/Usecase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <FadeWrapper>
      {/* Background mesh + animated grain */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00D9FF]/8 via-transparent to-transparent" />
      <div className="fixed inset-0 -z-10 opacity-[.015] animate-grain bg-[url('/images/grain.svg')]" />

      {/* Parallax blob layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-[120px] animate-float-reverse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-400/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-conic from-cyan-400/10 via-transparent to-green-400/10 blur-3xl" />
      </div>

      {/* 3️⃣  Hero Section */}
      <section className="relative isolate flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 text-center sm:pt-32">
        <div className="max-w-4xl">
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black tracking-tighter leading-none">
            <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Intervue AI
            </span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-snug">
            Your smart voice-based interviewer. Real-time feedback, zero stress,
            infinite growth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button
              onClick={() => router.push("/interviews")}
              className="px-8 py-6 group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary text-black font-semibold text-lg shadow-[0_0_20px_#00D9FF60] hover:shadow-[0_0_35px_#00D9FF90] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 " />
              <span className="relative z-10">Start Interview</span>
            </Button>
            <Button className="bg-transparent rounded-full px-8 py-6 text-primary font-semibold text-lg border border-primary transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-primary/15">
              Learn More
            </Button>
          </div>
        </div>

        {/* subtle scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg
            width="24"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 8v16M8 20l4 4 4-4" />
          </svg>
        </div>
      </section>

      {/*Why Choose Us */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="absolute top-28 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Why choose <span className="text-primary">Intervue</span>?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-white/60">
            AI that listens, adapts and guides you to your dream role.
          </p>
        </header>
        <Cards />
      </section>

      {/* Use Cases */}
      <section className="relative  max-w-7xl mx-auto px-6 pb-32">
        <div className="absolute top-10 right-20 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <header className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Who Is This For?
          </h2>
        </header>
        <UseCases />
      </section>

      {/* Bottom CTA strip */}
      <section className="relative z-10 bg-gradient-to-r from-[#00D9FF]/10 via-transparent to-[#00FF94]/10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white">
            Ready to ace your next interview?
          </h3>
          <Button
            onClick={() => router.push("/interviews")}
            className="px-6 py-6 mt-6 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition"
          >
            Get Started — It’s Free
          </Button>
        </div>
      </section>
    </FadeWrapper>
  );
}

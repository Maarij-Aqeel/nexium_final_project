"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    { icon: "🎙️", title: "Voice-First AI", desc: "Speak naturally—our AI listens, understands and responds in real time." },
    { icon: "⚡", title: "Instant Feedback", desc: "Get actionable insights the moment your answer ends." },
    { icon: "🎯", title: "Adaptive Difficulty", desc: "Questions scale with your level, keeping every session challenging yet fair." },
    { icon: "📊", title: "Smart Analytics", desc: "Track strengths & gaps with crystal-clear dashboards and progress heat-maps." },
  ];

  const team = [
    { name: "AI Engine", role: "Powered by OpenAI & Whisper", avatar: "🤖" },
    { name: "Design System", role: "Glass-morphic & Motion", avatar: "🎨" },
    { name: "Dev Team", role: "Next.js & Tailwind", avatar: "⚙️" },
  ];

  return (
    <main className="min-h-screen bg-hero-gradient text-white">
      {/* Hero Section */}
      <section className="relative isolate flex flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            Meet <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Intervue AI</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
            The modern way to master technical interviews—powered by voice AI, wrapped in beautiful design.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild className="rounded-full px-8 py-3 text-black font-semibold bg-gradient-to-r from-primary to-secondary">
              <Link href="/interviews">Try Free</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-8 py-3 border-white/30 text-white hover:bg-white/10">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-white/60">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            We believe everyone deserves a fair shot at their dream role. By combining cutting-edge
            AI with human-centered design, we turn interview anxiety into interview confidence—one
            conversation at a time.
          </p>
        </motion.div>
      </section>

      {/* Team */}
      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-12">Built With</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {team.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-3xl">
                  {t.avatar}
                </div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/60">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-white/70 mb-6">
            Start practicing today—no credit card required.
          </p>
          <Button asChild className="rounded-full px-8 py-3 text-black font-semibold bg-gradient-to-r from-primary to-secondary">
            <Link href="/interviews">Start Free Interview</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
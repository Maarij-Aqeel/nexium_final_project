"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, easeInOut } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import Cards from "@/components/Cards";

export default function AboutPage() {
  const team = [
    {
      name: "AI Engine",
      role: "Vapi",
      avatar: "https://media.theresanaiforthat.com/icons/vapi.svg?width=100",
    },
    {
      name: "Design System",
      role: "Framer-motion",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlFtXuYAnLXi6EFUU3HD-EAi5HfebFXywrA&s",
    },
    {
      name: "Dev Team",
      role: "Next.js & Tailwind",
      avatar:
        "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
    },
  ];

  return (
    <main className="min-h-screen bg-hero-gradient text-white">
      {/* Hero Section */}
      <section className="relative isolate flex flex-col items-center justify-center px-6 lg:px-8 py-28 lg:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Meet <br className="md:hidden" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Intervue AI
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 lg:mt-8 max-w-3xl mx-auto text-xl md:text-2xl lg:text-2xl text-white/80 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            The modern way to master technical interviews—powered by voice AI,
            wrapped in beautiful design.
          </motion.p>

          <motion.div
            className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button
              asChild
              className="rounded-full px-12 py-7 text-lg text-black font-semibold bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_#00D9FF60] hover:shadow-[0_0_35px_#00D9FF90] hover:scale-105 transition-all duration-300 ease-out"
            >
              <Link href="/interviews">Try Free</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full px-12 py-7 text-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <Cards />
        </motion.div>
      </section>

      {/* Mission */}
      <section className="px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 lg:mb-10 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl lg:text-2xl text-white/70 leading-relaxed font-light max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            We believe everyone deserves a fair shot at their dream role. By
            combining cutting-edge AI with human-centered design, we turn
            interview anxiety into interview confidence—one conversation at a
            time.
          </motion.p>
        </motion.div>
      </section>

      {/* Team */}
      <section className="px-6 lg:px-8 pb-24 lg:pb-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 lg:mb-20 tracking-tight"
          >
            Built With
          </motion.h2>
          <div className="flex justify-center gap-12 lg:gap-16 flex-wrap">
            {team.map((t, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="space-y-4 cursor-pointer group"
              >
                <img
                  src={t.avatar}
                  className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-4xl lg:text-4xl group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out"
                />
                <div className="space-y-1">
                  <p className="font-semibold text-white text-lg lg:text-xl">
                    {t.name}
                  </p>
                  <p className="text-sm lg:text-base text-white/60">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Ready to Level Up?
          </motion.h2>
          <motion.p
            className="text-xl lg:text-2xl text-white/70 mb-8 lg:mb-10 font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Start practicing today—no credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button
              asChild
              className="rounded-full px-12 py-7 text-lg text-black font-semibold bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-[0_0_35px_#00D9FF90] transition-all duration-300 ease-out"
            >
              <Link href="/interviews">Start Free Interview</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

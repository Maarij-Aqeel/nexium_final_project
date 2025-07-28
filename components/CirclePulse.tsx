// components/VoicePulse.tsx
"use client";
import { motion } from "framer-motion";

export default function Pulse() {
  return (
    <div className="relative grid place-items-center w-28 h-28">
      {/* 1. soft ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D9FF]/30 to-[#00FF94]/30 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* // outer ring */}
      <motion.div
        className="absolute rounded-full border border-primary/90"
        style={{ width: 140, height: 140 }}
        animate={{
          scale: [0, 1.4],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute rounded-full border border-secondary/90"
        style={{ width: 120, height: 120 }}
        animate={{
          scale: [0, 1.25],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3,
        }}
      />
      {/* core sphere */}
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00FF94] shadow-[0_0_25px_#00D9FF90]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

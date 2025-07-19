"use client"
import { motion } from "framer-motion";

export default function Pulse() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-32 h-32"
    >
      {/* Rings */}
      {[0, 0.3, 0.6, 0.9].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: `rgba(139, 92, 246, ${0.4 + i * 0.1})`,
          }}
          animate={{
            scale: [1, 2.2 - i * 0.2, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}

      {/* Breathing Core */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 via-primary to-violet-700 shadow-2xl"
        animate={{
          scale: [1, 1.15, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.2)",
            "0 0 40px rgba(139, 92, 246, 0.8), inset 0 0 30px rgba(139, 92, 246, 0.4)",
            "0 0 30px rgba(139, 92, 246, 0.6), inset 0 0 25px rgba(139, 92, 246, 0.3)",
            "0 0 20px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glow */}
      <motion.div
        className="absolute inset-6 rounded-full bg-white/20 backdrop-blur-sm"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

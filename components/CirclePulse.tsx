// components/PulseCircle.tsx
import { motion } from "framer-motion";

export default function Pulse() {
  return (
    <div className="relative w-32 h-32">
      {/* pulsing rings */}
      <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-custom-ping delay-[0ms]"></div>
      <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-custom-ping delay-[700ms]"></div>
      <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-custom-ping delay-[1400ms]"></div>

      {/*  Center circle */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg"
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6", "0 0 0px #3b82f6"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

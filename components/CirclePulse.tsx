"use client";
import { motion } from "framer-motion";

export default function Pulse() {
  const ringColors = [
    "rgba(0, 217, 255, 0.15)",
    "rgba(0, 255, 148, 0.13)",
    "rgba(139, 92, 246, 0.11)",
    "rgba(147, 51, 234, 0.09)",
    "rgba(99, 102, 241, 0.07)",
  ];
  const pulseColors = [
    "rgba(0, 217, 255, 0.4)",
    "rgba(0, 255, 148, 0.5)",
    "rgba(139, 92, 246, 0.6)",
    "rgba(147, 51, 234, 0.7)",
  ];

  return (
    <div>
      {/* Outer Energy Rings */}
      {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
        <motion.div
          key={`outer-${i}`}
          className="absolute rounded-full border"
          style={{
            width: `${120 + i * 15}px`,
            height: `${120 + i * 15}px`,
            borderColor: ringColors[i],
            borderWidth: "1px",
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}

      {/* Main Pulse Rings */}
      {[0, 0.15, 0.3, 0.45].map((delay, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2"
          style={{
            width: "100px",
            height: "100px",
            borderColor: pulseColors[i % pulseColors.length],
          }}
          animate={{
            scale: [1, 2.5 - i * 0.3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}

      {/* AI Core with Neural Network Effect */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-[#00FFC8] to-secondary shadow-2xl overflow-hidden"
        animate={{
          scale: [1, 1.2, 1.1, 1],
          boxShadow: [
            "0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)",
            "0 0 50px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.2)",
            "0 0 40px rgba(139, 92, 246, 0.7), inset 0 0 25px rgba(255, 255, 255, 0.15)",
            "0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Glow */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent backdrop-blur-sm"
          animate={{
            opacity: [0.4, 0.8, 0.6, 0.4],
            scale: [0.9, 1.1, 1, 0.9],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Neural Dots */}
        {[0, 0.3, 0.6].map((delay, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${30 + i * 15}%`,
              left: `${25 + i * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        ))}
      </motion.div>

      {/* Speaking Indicators */}
      {[-15, 0, 15].map((angle, i) => (
        <motion.div
          key={`speaker-${i}`}
          className="absolute w-3 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(45px)`,
          }}
          animate={{
            scaleX: [0.5, 1.5, 0.8, 1],
            opacity: [0.3, 1, 0.6, 0.8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Floating Particles */}
      {[0, 0.4, 0.8, 1.2].map((delay, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[#00FFC8] rounded-full"
          style={{
            top: `${20 + i * 20}%`,
            left: `${15 + i * 25}%`,
          }}
          animate={{
            y: [-10, -25, -10],
            x: [-5, 5, -5],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}

      {/* Ambient Glow Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

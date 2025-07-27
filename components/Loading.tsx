"use client"
import { motion } from "framer-motion";

export default function Loading({
  msg1="",
  msg2 = "",
}: {
  msg1?: string;
  msg2?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-hero-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center space-y-6"
      >
        {/* Enhanced loading spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
        />

        {/* Animated loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg font-medium"
          >
            {msg1}
          </motion.div>
          {msg2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm text-white/70 mt-2"
            >
              {msg2}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

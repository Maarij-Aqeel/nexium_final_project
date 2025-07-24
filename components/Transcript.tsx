// components/TranscriptBox.tsx
"use client";
import { motion } from "framer-motion";

export default function TranscriptBox({
  transcript,
}: {
  transcript: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="mt-8 w-full sm:w-4/6 md:w-3/5 lg:w-2/5 mx-auto"
    >
      <motion.div
        className="relative p-6 rounded-2xl border border-gray-600/30 bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-black/80 shadow-2xl backdrop-blur-xl"
        initial={{ backdropFilter: "blur(10px)" }}
        animate={{ backdropFilter: "blur(15px)" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Live Transcript
          </h2>

          <motion.div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-secondary to-primary rounded-full"
                  animate={{
                    height: [8, 24, 12, 20, 8],
                    opacity: [0.4, 1, 0.6, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <motion.span
              className="text-sm font-medium bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Listening
            </motion.span>
          </motion.div>
        </motion.div>

        <div className="max-h-72 overflow-y-auto space-y-3 pr-3 custom-scrollbar">
          {transcript.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-secondary to-primary rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              />
              <p className="text-sm text-gray-100 font-medium leading-relaxed pl-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                {line}
              </p>

              {index === transcript.length - 1 && (
                <div className="flex items-center gap-1 ml-4 mt-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-violet-400 rounded-full"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {transcript.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="flex items-center justify-center h-32 text-gray-400"
            >
              <motion.div
                className="text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-sm font-medium">Waiting for audio...</p>
                <motion.div
                  className="w-10 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mt-3"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-900/90 to-transparent rounded-b-2xl pointer-events-none"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

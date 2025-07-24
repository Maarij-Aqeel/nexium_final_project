import { motion } from "framer-motion";

interface InterviewTimerProps {
  minutes: number;
  seconds: number;
  timeLeft: number;
}

export const InterviewTimer = ({ minutes, seconds, timeLeft }: InterviewTimerProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-row items-center gap-2 text-xl text-primary"
    >
      <motion.svg
        animate={{
          rotate: timeLeft < 300 ? [0, 5, -5, 0] : 0,
          scale: timeLeft < 60 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: 0.5,
            repeat: timeLeft < 300 ? Infinity : 0,
            repeatDelay: 2,
          },
          scale: { duration: 1, repeat: timeLeft < 60 ? Infinity : 0 },
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className={timeLeft < 300 ? "text-red-400" : "text-primary"}
      >
        <path
          fill="currentColor"
          d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95zM11 6V4h2v2zm7 7v-2h2v2zm-7 7v-2h2v2zm-7-7v-2h2v2zm8 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
        />
      </motion.svg>

      <motion.div
        className="flex items-center gap-1"
        animate={
          timeLeft < 60 ? { color: ["#ef4444", "#ffffff", "#ef4444"] } : {}
        }
        transition={{ duration: 1, repeat: timeLeft < 60 ? Infinity : 0 }}
      >
        <motion.h1
          key={minutes}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {minutes.toString().padStart(2, "0")}
        </motion.h1>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <motion.h1
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {seconds.toString().padStart(2, "0")}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

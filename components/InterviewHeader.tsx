import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InterviewTimer } from "./InterviewTimer";

interface InterviewHeaderProps {
  minutes: number;
  seconds: number;
  timeLeft: number;
  onEndInterview: () => void;
}

export const InterviewHeader = ({
  minutes,
  seconds,
  timeLeft,
  onEndInterview,
}: InterviewHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex mt-5 flex-row justify-between items-center mx-auto w-full md:w-2/3 px-4 md:px-8"
    >
      <InterviewTimer
        minutes={minutes}
        seconds={seconds}
        timeLeft={timeLeft}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className="bg-red-600 px-8 py-5 rounded-xl hover:bg-red-600/60 transition-all duration-300 shadow-lg hover:shadow-red-600/20"
          onClick={onEndInterview}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            End Interview
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

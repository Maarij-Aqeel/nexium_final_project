"use client";

import { Button } from "@/components/ui/button";
import { useTimer } from "react-timer-hook";
import { use } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { interviewManager } from "@/lib/interview";
import { TextFade } from "@/components/FadeUp";
import Progress from "@/components/Progress";
import FormatQuestions from "@/lib/FormatQuestions";
import VapiClient from "@/components/Vapi";
import { motion,  } from "framer-motion";

export default function InterviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get the interview
  const { id } = use(params);

  const interview = interviewManager.getById(id);

  // Some Variables for State management
  const [stopCall, setStopCall] = useState(false);
  const [isLoading, SetIsLoading] = useState(true);
  const [questions, SetQuestions] = useState("");

  // Timer Setup
  const totalDuration = interview ? interview.duration * 60 : 5 * 60;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalDuration);
  const { minutes, seconds } = useTimer({ expiryTimestamp });
  const timeLeft = minutes * 60 + seconds;
  const progressValue = ((totalDuration - timeLeft) / totalDuration) * 100;

  // Fetch questions on load
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interview) return;

      try {
        const res = await fetch("/api/n8n", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interview),
        });

        // Format the Questions Properly
        const data = await res.json();
        if (data) {
          const formatted = FormatQuestions(data);
          SetQuestions(formatted);
          SetIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch questions", err);
        toast.error("Failed to get Questions. Try again later.");
        SetIsLoading(false);
      }
    };

    fetchQuestions();
  }, [interview]);

  // Loading component with enhanced animation
  if (isLoading || !interview) {
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
              Preparing your interview...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm text-white/70 mt-2"
            >
              Generating personalized questions
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <TextFade
      direction="up"
      className="flex flex-col min-h-screen px-4 py-4 overflow-hidden bg-hero-gradient"
    >
      {/* Header row with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex mt-5 flex-row justify-between items-center mx-auto w-full md:w-2/3 px-4 md:px-8"
      >
        {/* Enhanced Timer with pulsing effect */}
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

        {/* Enhanced End Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-red-600 px-8 py-5 rounded-xl hover:bg-red-600/60 transition-all duration-300 shadow-lg hover:shadow-red-600/20"
            onClick={() => setStopCall(true)}
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

      {/* Enhanced Progress bar with smooth animation */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 w-full"
      >
        <Progress progress={progressValue} />
      </motion.div>

      {/* Interview Assistant with fade-in animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-start mt-10 ml-8 relative"
      >
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <VapiClient Questions={questions} timeleft={timeLeft} stopCall={stopCall} />
          </motion.div>
        )}

        {/* Subtle breathing indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.7, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="ml-6 text-white/70 text-sm"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Listening...
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Subtle background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
        className="fixed inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        />
      </motion.div>
    </TextFade>
  );
}

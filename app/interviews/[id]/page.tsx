"use client";

import TranscriptBox from "@/components/Transcript";
import gettime from "@/lib/time";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { useTimer } from "react-timer-hook";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useInterviewLogic } from "@/app/hooks/useInterviewLogic";
import { TextFade } from "@/components/FadeUp";
import Progress from "@/components/Progress";
import VapiClient from "@/components/Vapi";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useUser } from "@/app/context/user-context";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { interview, questions, isLoading } = useInterviewLogic(id);

  const [vapitime, setVapiTime] = useState("");
  const [transcript, setTranscript] = useState<string[]>([]);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);
  const [stopCall, setStopCall] = useState(false);
  const [timerInitialized, setTimerInitialized] = useState(false);
  const { profile } = useUser();
  const router = useRouter();

  // Use useMemo for totalDuration to prevent recalculation
  const totalDuration = useMemo(() => {
    return interview ? interview.duration * 60 : 5 * 60;
  }, [interview?.duration]);

  // Timer Setup - only initialize with valid expiry timestamp
  const { minutes, seconds, restart, start } = useTimer({
    expiryTimestamp:
      expiryTimestamp || new Date(Date.now() + totalDuration * 1000),
    autoStart: false,
  });

  const timeLeft = minutes * 60 + seconds;
  const progressValue = ((totalDuration - timeLeft) / totalDuration) * 100;

  // Set Expiry Time only once when interview loads
  useEffect(() => {
    if (interview && !expiryTimestamp) {
      const now = new Date();
      now.setSeconds(now.getSeconds() + totalDuration);
      setExpiryTimestamp(now);
      setVapiTime(gettime(interview.duration * 60));
    }
  }, [interview, totalDuration, expiryTimestamp]);

  // Start timer when expiry timestamp is set - only once
  useEffect(() => {
    if (expiryTimestamp && !timerInitialized && !stopCall) {
      setTimerInitialized(true);
      restart(expiryTimestamp);
      start();
    }
  }, [expiryTimestamp, timerInitialized, stopCall]);

  // Stop Call if time ends
  const handleTimeUp = useCallback(() => {
    if (!stopCall) {
      setStopCall(true);
      toast.info("Time's up! Redirecting .");
      setTimeout(() => {
        router.push(`/results?p=${interview?.id}&q=${profile?.id}`);
      }, 1500);
    }
  }, [stopCall, router]);

  useEffect(() => {
    if (
      interview &&
      expiryTimestamp &&
      timerInitialized &&
      timeLeft <= 0 &&
      !stopCall
    ) {
      handleTimeUp();
    }
  }, [
    timeLeft,
    interview,
    expiryTimestamp,
    timerInitialized,
    stopCall,
    handleTimeUp,
  ]);

  // Loading component with enhanced animation
  if (isLoading || !interview) {
    return (
      <Loading
        msg1="Preparing your interview..."
        msg2="Generating personalized questions"
      />
    );
  }

  return (
    (
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
                timeLeft < 60
                  ? { color: ["#ef4444", "#ffffff", "#ef4444"] }
                  : {}
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
              <VapiClient
                Questions={questions}
                timeleft={timeLeft}
                stopCall={stopCall}
                name={profile?.name || "user"}
                setTranscript={setTranscript}
                vapitime={vapitime}
                interviewId={interview.id}
                userId={profile?.id || ""}
                assignedBy={profile?.is_company ? profile.id : null}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Transcript */}
        <div className="flex justify-center">
          <TranscriptBox transcript={transcript} />
        </div>

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
    )
  );
}

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UseInterviewTimerProps {
  duration: number; // in minutes
  interviewId: string;
  profile: any;
  onTimeUp?: () => void;
}

export const useInterviewTimer = ({
  duration,
  interviewId,
  profile,
  onTimeUp,
}: UseInterviewTimerProps) => {
  const [stopCall, setStopCall] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Calculate total duration in seconds
  const totalDuration = useMemo(() => duration * 60, [duration]);

  // Create expiry timestamp
  const expiryTimestamp = useMemo(() => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + totalDuration);
    return now;
  }, [totalDuration]);

  // Initialize timer
  const { minutes, seconds, restart, start } = useTimer({
    expiryTimestamp,
    autoStart: false,
  });

  const timeLeft = minutes * 60 + seconds;
  const progressValue = ((totalDuration - timeLeft) / totalDuration) * 100;

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (!stopCall) {
      setStopCall(true);
      toast.info("Time's up! Redirecting...");

      if (onTimeUp) {
        onTimeUp();
      } else {
        setTimeout(() => {
          router.push(`/results?p=${interviewId}&q=${profile?.id}`);
        }, 3000);
      }
    }
  }, [stopCall, router, interviewId, profile, onTimeUp]);

  // Initialize timer when component mounts
  useEffect(() => {
    if (!isInitialized && !stopCall) {
      setIsInitialized(true);
      restart(expiryTimestamp);
      start();
    }
  }, [expiryTimestamp, isInitialized, stopCall, restart, start]);

  // Check for time up
  useEffect(() => {
    if (isInitialized && timeLeft <= 0 && !stopCall) {
      handleTimeUp();
    }
  }, [timeLeft, isInitialized, stopCall, handleTimeUp]);

  return {
    minutes,
    seconds,
    timeLeft,
    progressValue,
    totalDuration,
    stopCall,
    setStopCall,
  };
};

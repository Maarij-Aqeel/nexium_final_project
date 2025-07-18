"use client";

import { Button } from "@/components/ui/button";
import Pulse from "@/components/CirclePulse";
import { useTimer } from "react-timer-hook";
import { TextFade } from "@/components/FadeUp";
import Progress from "@/components/Progress";

export default function TimerComp() {
  const totalDuration = 5 * 60; // 5 minutes
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalDuration);

  const { minutes, seconds } = useTimer({ expiryTimestamp });

  const timeLeft = minutes * 60 + seconds;
  const progressValue = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <TextFade
      direction="up"
      className="flex flex-col  min-h-screen px-4 py-4 overflow-hidden bg-hero-gradient"
    >
      {/* Header row */}
      <div className="flex mt-5 flex-row justify-between items-center mx-auto w-full md:w-2/3 px-4 md:px-8">
        {/* Timer */}
        <div className="flex flex-row items-center gap-2 text-xl text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95zM11 6V4h2v2zm7 7v-2h2v2zm-7 7v-2h2v2zm-7-7v-2h2v2zm8 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
            />
          </svg>
          <h1>{minutes.toString().padStart(2, "0")}</h1>
          <span>:</span>
          <h1>{seconds.toString().padStart(2, "0")}</h1>
        </div>

        {/* End Button */}
        <Button className="bg-red-600 px-8 py-5 rounded-xl hover:bg-red-600/60 transition-all duration-200">
          End Interview
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-full">
        <Progress progress={progressValue} />
      </div>

      {/* Pulse Animation to Left */}
      <div className="flex items-center justify-start mt-10 ml-8">
        <Pulse />
      </div>
    </TextFade>
  );
}

"use client";

import gettime from "@/lib/time";
import Loading from "@/components/Loading";
import { useInterviewLogic } from "@/app/hooks/useInterviewLogic";
import { TextFade } from "@/components/FadeUp";
import { use, useEffect } from "react";
import { useUser } from "@/app/context/user-context";
import { useState } from "react";
import TimerWrapper from "@/components/TimerWrapper";
import { usePathname } from "next/navigation";
import { useInterceptRouteChange } from "@/app/hooks/useInterceptRoute";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { interview, questions, isLoading } = useInterviewLogic(id);
  const [pending, setPending] = useState(false);
  const { profile } = useUser();
  const pathname = usePathname();
  const [transcript, setTranscript] = useState<string[]>([]);

  useInterceptRouteChange(pending);

  useEffect(() => {
    setPending(true);
  }, [pathname]);

  if (isLoading || !interview) {
    return (
      <Loading
        msg1="Preparing your interview..."
        msg2="Generating personalized questions"
      />
    );
  }

  const vapitime = gettime(interview.duration * 60);

  return (
    <TextFade
      direction="up"
      className="flex flex-col min-h-screen px-4 py-4 overflow-hidden bg-hero-gradient"
    >
      <TimerWrapper
        interview={interview}
        profileId={profile?.id || ""}
        vapitime={vapitime}
        questions={questions}
        transcript={transcript}
        setTranscript={setTranscript}
      />
    </TextFade>
  );
}

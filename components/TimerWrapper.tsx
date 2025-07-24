"use client";

import { useInterviewTimer } from "@/app/hooks/useInterviewTimer";
import { InterviewHeader } from "@/components/InterviewHeader";
import { InterviewContent } from "@/components/InterviewContent";

export default function TimerWrapper({
  interview,
  profileId,
  vapitime,
  questions,
  transcript,
  setTranscript,
}: {
  interview: any;
  profileId: string;
  vapitime: string;
  questions: any;
  transcript: string[];
  setTranscript: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const {
    minutes,
    seconds,
    timeLeft,
    progressValue,
    stopCall,
    setStopCall,
  } = useInterviewTimer({
    duration: interview.duration,
    interviewId: interview.id,
    profileId,
  });

  return (
    <>
      <InterviewHeader
        minutes={minutes}
        seconds={seconds}
        timeLeft={timeLeft}
        onEndInterview={() => setStopCall(true)}
      />

      <InterviewContent
        progressValue={progressValue}
        transcript={transcript}
        setTranscript={setTranscript}
        questions={questions}
        timeLeft={timeLeft}
        stopCall={stopCall}
        profile={{ id: profileId }} // pass profile as needed
        vapitime={vapitime}
        interviewId={interview.id}
      />
    </>
  );
}

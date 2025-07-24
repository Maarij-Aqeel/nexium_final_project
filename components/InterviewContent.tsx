import { motion } from "framer-motion";
import TranscriptBox from "@/components/Transcript";
import Progress from "@/components/Progress";
import VapiClient from "@/components/Vapi";
import InterviewBackground from "./InterviewBackground";

interface InterviewContentProps {
  progressValue: number;
  transcript: string[];
  setTranscript: (transcript: string[]) => void;
  questions: any[];
  timeLeft: number;
  stopCall: boolean;
  profile: any;
  vapitime: string;
  interviewId: string;
}

export const InterviewContent = ({
  progressValue,
  transcript,
  setTranscript,
  questions,
  timeLeft,
  stopCall,
  profile,
  vapitime,
  interviewId,
}: InterviewContentProps) => {
  return (
    <>
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 w-full"
      >
        <Progress progress={progressValue} />
      </motion.div>

      {/* Interview Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-start mt-10 ml-8 relative"
      >
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
            interviewId={interviewId}
            userId={profile?.id || ""}
            assignedBy={profile?.is_company ? profile.id : null}
          />
        </motion.div>
      </motion.div>

      {/* Transcript */}
      <div className="flex justify-center">
        <TranscriptBox transcript={transcript} />
      </div>

      {/* Background decoration */}
      <InterviewBackground />
    </>
  );
};
"use client";

import { useEffect, useRef } from "react";
import Pulse from "./CirclePulse";
import Vapi from "@vapi-ai/web";

export default function VapiClient({
  stopCall,
  Questions,
  timeleft,
  name,
  vapitime,
  setTranscript,
  setError,
  interviewId,
  userId,
  assignedBy,
}: {
  stopCall: boolean;
  Questions: string;
  timeleft: number;
  setError: any;
  name: string;
  vapitime: string;
  interviewId: string;
  userId: string;
  assignedBy: string | null;
  setTranscript: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    const handleError = (message: any) => {
      setError(true);
    };
    const handleMessage = (message: any) => {
      console.log("📥 VAPI message received:", message); // Add this

      if (message.transcript) {
        setTranscript((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = message.transcript;
          } else {
            updated.push(message.transcript);
          }
          return updated;
        });
      }
    };

    vapi.on("error", handleError);
    vapi.on("message", handleMessage);

    // AssistantOverrides with dynamic vars
    const assistantOverrides = {
      variableValues: {
        name: name,
        questions: Questions,
        vapitime: vapitime,
        interviewId: interviewId,
        userId: userId,
        assignedBy: assignedBy,
      },
    };

    (async () => {
      try {
        await vapi.start(assistantId, assistantOverrides);
      } catch (error) {
        console.error("Error starting Vapi:", error);
      }
    })();

    return () => {
      vapi.off("error", handleError);
      vapi.off("message", handleMessage);
      vapi.stop();
    };
  }, [Questions, name]);

  // Stop the call
  useEffect(() => {
    if (timeleft <= 3 || stopCall) {
      vapiRef.current?.say("Our time's up, goodbye!", true);
      vapiRef.current?.stop();
    }
  }, [stopCall, timeleft]);

  return <Pulse />;
}

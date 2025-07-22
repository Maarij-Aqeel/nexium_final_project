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
  interviewId,
  userId,
  assignedBy,
}: {
  stopCall: boolean;
  Questions: string;
  timeleft: number;
  name: string;
  vapitime: string;
  interviewId: string;
  userId: string;
  assignedBy: string | null;
  // This is used to update the transcript in the parent component
  setTranscript: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;


    vapi.on("message", (message) => {
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
    });

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
        console.log(`Ending time is ${vapitime}`)
      } catch (error) {
        console.error("Error starting Vapi:", error);
      }
    })();

    return () => {
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

  return (
   
      <Pulse />
  );
}

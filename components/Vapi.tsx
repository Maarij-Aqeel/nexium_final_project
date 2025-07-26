"use client";

import { useEffect, useRef } from "react";
import Pulse from "./CirclePulse";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const hasSentReminder = useRef(false);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    // vapi.on("error", (message) => {
    //   setError(true);
    // });

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

    vapi.on("call-end", () => {
      if (!stopCall) {
        setTimeout(() => {
          router.push(`/results?p=${interviewId}&q=${userId}`);
        }, 2000);
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
    if (stopCall) {
      vapiRef.current?.stop();
    }
  }, [stopCall]);

  useEffect(() => {
    if (timeleft > 30 || hasSentReminder.current) return;
    if (vapiRef.current) {
      vapiRef.current.send({
        type: "add-message",
        message: {
          role: "system",
          content:
            "Only 30 seconds left. Please begin wrapping up the interview or ask a final short question.",
        },
      });
      hasSentReminder.current = true;
    }
  }, [timeleft]);

  return <Pulse />;
}

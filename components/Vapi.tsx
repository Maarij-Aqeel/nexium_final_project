"use client";

import { useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

export default function VapiClient({
  stopCall,
  Questions,
}: {
  stopCall: boolean;
  Questions: string;
}) {
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on("error", (err) => {
      console.error(" Vapi error:", err);
    });

    vapi.on("call-start", () => {
      console.log(" Call started!");
      console.log(" The Questions are:", Questions);
    });

    // AssistantOverrides with dynamic vars
    const assistantOverrides = {
      variableValues: {
        name: "Maarij",
        questions: Questions,
      },
    };

    vapi.start(assistantId, assistantOverrides);

    return () => {
      vapi.stop();
    };
  }, []);

  // Stop the call if stopCall is true
  useEffect(() => {
    if (stopCall && vapiRef.current) {
      vapiRef.current.say("Our time's up, goodbye!", true);
      vapiRef.current.stop();
    }
  }, [stopCall]);

  return <div>📞 Vapi is active</div>;
}

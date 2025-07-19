"use client";

import { useEffect, useRef } from "react";
import Pulse from "./CirclePulse";
import Vapi from "@vapi-ai/web";
import { motion } from "framer-motion";

export default function VapiClient({
  stopCall,
  Questions,
  timeleft,
}: {
  stopCall: boolean;
  Questions: string;
  timeleft: number;
}) {
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      console.log(" Call started!");
      console.log(" The Questions are:", Questions);
    });

    vapi.on("message", (message) => {
      console.log(message);
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

  // Stop the call if user Clicked on Button
 useEffect(() => {
  if (timeleft <= 0 || stopCall) {
    vapiRef.current?.say("Our time's up, goodbye!", true);
    vapiRef.current?.stop();
  }
}, [stopCall, timeleft]);


  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Pulse />
    </motion.div>
  );
}

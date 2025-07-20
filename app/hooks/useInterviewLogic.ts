import { useEffect, useState } from "react";
import { getinterview } from "@/lib/db/Handleinterview";
import { isUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormatQuestions from "@/lib/FormatQuestions";

export function useInterviewLogic(id: string) {
  // All Variables/States
  const [interview, setInterview] = useState<null | {
    id: string;
    title: string;
    difficulty: string;
    duration: number;
    created_by: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState("");
  const [interviewFound, setInterviewFound] = useState(true);
  const router = useRouter();

  // Fetch interview
  useEffect(() => {
    const fetchInterview = async () => {
      if (!isUUID(id)) {
        setInterviewFound(false);
        return;
      }
      
      try {
        const data = await getinterview(id);
        if (!data) {
          setInterviewFound(false);
        } else {
          setInterview(data);
          setInterviewFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch interview:", error);
        setInterviewFound(false);
      }
    };
    
    fetchInterview();
  }, [id]); // Only depend on id

  // Redirect if Interview is not found - add router and interview to dependencies
  useEffect(() => {
    if (!interviewFound && interview === null) {
      console.log("Interview not found, redirecting...");
      router.push("/");
    }
  }, [interviewFound, interview, router]);

  // Fetch questions when interview is loaded
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interview || !isUUID(id)) return;
      
      try {
        setIsLoading(true); // Set loading when starting to fetch questions
        
        const res = await fetch("/api/n8n", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interview),
        });

        const data = await res.json();
        if (data) {
          const formatted = FormatQuestions(data);
          setQuestions(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch questions", err);
        toast.error("Failed to get Questions. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [interview?.id, id]); // Only depend on interview.id to avoid unnecessary re-runs

  return {
    interview,
    questions,
    isLoading,
  };
}
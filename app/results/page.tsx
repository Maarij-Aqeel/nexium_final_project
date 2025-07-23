"use client";

import Loading from "@/components/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CircularProgress from "@/components/Radix_score";
import useSWR from "swr";
import { getsession } from "@/lib/db/Handleinterview";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const interview_id = searchParams.get("p") || "";
  const student_id = searchParams.get("q") || "";
  const [session_data, setSessionData] = useState<any>(null);

  const { data, error, isLoading } = useSWR(
    interview_id && student_id ? [`session`, interview_id, student_id] : null,
    () => getsession(interview_id, student_id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (data) setSessionData(data);

    console.log("Results are ", data);
  }, [data]);

  const scoreMessage = (score: number) => {
    return score >= 85
      ? "Outstanding performance!"
      : score >= 70
      ? "Great job, room for polish!"
      : score >= 50
      ? "Decent start, keep practicing!"
      : "Needs improvement — don’t give up!";
  };

  {
    if (error) return <div>Unable to get interview results</div>;
  }
  {
    if (isLoading)
      return (
        <Loading msg1="Generating your interview results..."/>
      );
  }

  return (
    <div className="bg-hero-gradient flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-12">
      <h1 className="text-center text-3xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
        Interview Results
      </h1>

      {session_data && session_data[0] && (
        <>
          {/* Score Card */}
          <Card className="px-8 py-10 w-full max-w-sm backdrop-blur-md bg-[#0F1521] border border-white/10 rounded-2xl shadow-xl">
            <CardTitle className="text-center text-2xl font-semibold text-white mb-4">
              Overall Score
            </CardTitle>
            <CardContent className="flex justify-center">
              <CircularProgress value={session_data[0].scores} />
            </CardContent>
            <CardDescription className="text-center text-lg text-gray-300 ">
              {scoreMessage(session_data[0].scores)}
            </CardDescription>
          </Card>

          {/* Feedback Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-5xl ">
            {/* Strengths */}
            <Card className="p-6 bg-[#0F1521] backdrop-blur-md border border-white/10 rounded-xl shadow-md">
              <CardHeader>
                <img
                  src={
                    "https://img.icons8.com/?size=100&id=uEYO02ekLzVD&format=png&color=000000"
                  }
                />
                <CardTitle className="text-2xl font-semibold text-white">
                  Strengths
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  {session_data[0].feedback.strengths}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Areas of Improvement */}
            <Card className="p-6 bg-[#0F1521] backdrop-blur-md border border-white/10 rounded-xl shadow-md">
              <CardHeader>
                <img
                  src={
                    "https://img.icons8.com/?size=100&id=117363&format=png&color=000000"
                  }
                />
                <CardTitle className="text-2xl font-semibold text-white">
                  Areas for Improvement
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  {session_data[0].feedback.needed_improvements}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

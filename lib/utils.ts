import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if valid interview-id
export const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  );

// Get Dashboard header data
export function dashboard_data(interview_sessions: any[]) {
  let completed = 0;
  let pending = 0;
  let totalScore = 0;

  for (const interview of interview_sessions) {
    if (interview.status?.toLowerCase() === "completed") {
      completed++;
    } else {
      pending++;
    }

    totalScore += interview.scores ?? 0;
  }

  const total_interviews = interview_sessions.length;
  const avg_score = total_interviews > 0 ? totalScore / total_interviews : 0;

  return {
    total_interviews,
    completed,
    pending,
    avg_score: Math.round(avg_score * 100) / 100,
  };
}

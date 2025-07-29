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

// Get Colors

export const getStatusVariant = (status: string) => {

  switch (status.trim().toLowerCase()) {
    case "completed":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10";
    case "pending":
      return "bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-sm shadow-orange-500/10";
    default:
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
  }
};

export const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score > 0) return "text-red-400";
  return "text-gray-400";
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Professional":
      return "text-red-400 bg-red-500/10 border border-red-500/20 shadow-sm shadow-red-500/10";
    case "Intermediate":
      return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 shadow-sm shadow-yellow-500/10";
    case "Beginner":
      return "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-sm shadow-emerald-500/10";
    default:
      return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
  }
};

export const scoreMessage = (score: number) => {
  return score >= 85
    ? "Outstanding performance!"
    : score >= 70
    ? "Great job, room for polish!"
    : score >= 50
    ? "Decent start, keep practicing!"
    : "Needs improvement — don't give up!";
};


export type InterviewSession = {
  id: string;
  interview_id: string;
  student_id: string;
  started_at: string;
  completed_at: string;
  scores: number;
  assigned_by: string | null;
  status: string;
  feedback: string;
  questions: { question: string; answer: string }[];
  interviews: {
    id:string
    difficulty: string;
    duration: number;
    title: string;
  };
};

export type DashboardData = {
  total_interviews: number;
  completed: number;
  pending: number;
  avg_score: number;
};
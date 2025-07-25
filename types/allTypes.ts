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
  interviews: Interview;
};

export type DashboardData = {
  total_interviews: number;
  completed: number;
  pending: number;
  avg_score: number;
};

export type Interview = {
  id: string;
  title: string;
  difficulty: string;
  duration: number;
  created_by: string;
};


export type Achievement = {
  title: string;
  description: string;
  icon:any
  color:string
};
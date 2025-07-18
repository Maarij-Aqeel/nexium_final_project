// Interview Class

interface Interview {
  id: string; // userId
  title:string
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
}

class InterviewManager {
  private interviews: Record<string, Interview> = {};

  createOrUpdate(id: string, data: Partial<Omit<Interview, "id">>) {
    const existing = this.interviews[id] || { id, difficulty: "Medium", duration: 5 };
    this.interviews[id] = { ...existing, ...data };
  }

  getById(id: string): Interview | null {
    return this.interviews[id] ?? null;
  }

 
}

export const interviewManager = new InterviewManager();

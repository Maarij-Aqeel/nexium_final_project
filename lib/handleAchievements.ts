import { InterviewSession } from "@/types/allTypes";
import { Achievement } from "@/types/allTypes";
import { Trophy, Target, Hourglass, Star, TrendingUp } from "lucide-react";

export function generateAchievements(
  interviews: InterviewSession[]
): Achievement[] {
  const achievements: Achievement[] = [];

  if (interviews.length === 0) return achievements;

  // Parse and preprocess
  const now = new Date();
  const scores = interviews.map((i) => i.scores);
  const durations = interviews.map(
    (i) =>
      (new Date(i.completed_at).getTime() - new Date(i.started_at).getTime()) /
      60000
  );

  // --- 1. Perfect Score Achiever ---
  if (scores.some((score) => score === 100)) {
    achievements.push({
      title: "Perfect Score Achiever",
      description: "Scored 100% in at least one interview.",
      icon: Star,
      color: "text-yellow-400",
    });
  }

  // --- 2. Consistency Champion (5 interviews in 7 days) ---
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const recentInterviews = interviews.filter(
    (i) => new Date(i.started_at) >= oneWeekAgo
  );
  if (recentInterviews.length >= 5) {
    achievements.push({
      title: "Consistency Champion",
      description: `Completed ${recentInterviews.length} interviews this week.`,
      icon: Trophy,
      color: "text-emerald-400",
    });
  }

  // --- 3. Improvement Master ---
  const sortedByDate = interviews
    .slice()
    .sort(
      (a, b) =>
        new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
    );
  const firstScore = sortedByDate[0].scores;
  const lastScore = sortedByDate[sortedByDate.length - 1].scores;

  const improvement = lastScore - firstScore;
  const improvementPercent =
    firstScore > 0 ? (improvement / firstScore) * 100 : 0;

  if (improvementPercent >= 20) {
    achievements.push({
      title: "Improvement Master",
      description: `Improved score by ${Math.round(
        improvementPercent
      )}% over time.`,
      color: "text-blue-400",
      icon: TrendingUp,
    });
  }

  // --- 4. Time Warrior (3 interviews ≥ 30 mins) ---
  const longInterviews = durations.filter((d) => d >= 5).length;
  if (longInterviews >= 3) {
    achievements.push({
      title: "Time Warrior",
      description: `Completed ${longInterviews} long interviews (7 minutes).`,
      icon: Hourglass,
      color: "text-teal-500",
    });
  }

  // --- 5. Marathon Learner (Total time ≥ 5 hours) ---
  const totalMinutes = durations.reduce((acc, d) => acc + d, 0);
  if (totalMinutes >= 300) {
    achievements.push({
      title: "Marathon Learner",
      description: `Spent ${Math.round(
        totalMinutes
      )} minutes in interviews in total.`,
      icon: Target,
      color: "text-cyan-400",
    });
  }

  return achievements;
}

import {
  User,
  Trophy,
  Target,
  Hourglass,
  Star,
  TrendingUp,
} from "lucide-react";
export function generateStats(dashdata) {
  return [
    {
      title: "Total Interviews",
      value: dashdata?.total_interviews?.toString() ?? "0",
      icon: User,
      gradientFrom: "from-blue-500/30",
      gradientTo: "to-cyan-400/30",
    },
    {
      title: "Completed",
      value: dashdata?.completed?.toString() ?? "0",
      icon: Trophy,
      gradientFrom: "from-emerald-500/30",
      gradientTo: "to-green-400/30",
    },
    {
      title: "Pending",
      value: dashdata?.pending?.toString() ?? "0",
      icon: Hourglass,
      gradientFrom: "from-orange-500/30",
      gradientTo: "to-yellow-400/30",
    },
    {
      title: "Average Score",
      value: dashdata ? `${dashdata.avg_score}%` : "0%",
      icon: Target,
      gradientFrom: "from-violet-500/30",
      gradientTo: "to-purple-400/30",
    },
  ];
}

export const recentAchievements = [
  {
    title: "Perfect Score Achiever",
    description: "Scored 100% in System Design",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    title: "Consistency Champion",
    description: "5 interviews completed this week",
    icon: Trophy,
    color: "text-emerald-400",
  },
  {
    title: "Improvement Master",
    description: "20% score increase this month",
    icon: TrendingUp,
    color: "text-blue-400",
  },
];

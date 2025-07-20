
import { User,Trophy,Target,Award, Star,TrendingUp} from "lucide-react";

  export const stats = [
    {
      title: "Total Interviews",
      value: "23",
      icon: User,
      gradient: "from-blue-500/30 to-cyan-400/30",
      change: "+3 this week",
    },
    {
      title: "Completed",
      value: "18",
      icon: Trophy,
      gradient: "from-emerald-500/30 to-green-400/30",
      change: "+5 this week",
    },
    {
      title: "Average Score",
      value: "87%",
      icon: Target,
      gradient: "from-violet-500/30 to-purple-400/30",
      change: "+2% improvement",
    },
    {
      title: "Success Rate",
      value: "94%",
      icon: Award,
      gradient: "from-orange-500/30 to-yellow-400/30",
      change: "Above average",
    },
  ];

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
  ]
import { User, Trophy, Target, Hourglass } from "lucide-react";
export function generateStats(dashdata) {
  return [
    {
      title: "Total Interviews",
      value: dashdata?.total_interviews?.toString() ?? "0",
      icon: User,
      gradientKey: "user",
    },
    {
      title: "Completed",
      value: dashdata?.completed?.toString() ?? "0",
      icon: Trophy,
      gradientKey: "trophy",
    },
    {
      title: "Pending",
      value: dashdata?.pending?.toString() ?? "0",
      icon: Hourglass,
      gradientKey: "hourglass",
    },
    {
      title: "Average Score",
      value: dashdata ? `${dashdata.avg_score}%` : "0%",
      icon: Target,
      gradientKey: "target",
    },
  ];
}

export function getGradient(icon) {
  let classname = `h-40 p-6 rounded-2xl shadow-xl backdrop-blur-md  border border-white/10 relative overflow-hidden bg-gradient-to-tr `;

  switch (icon) {
    case "user":
      return classname + "from-blue-500/30 to-cyan-400/30";

    case "trophy":
      return classname + "from-emerald-500/30 to-green-400/30";

    case "hourglass":
      return classname + "from-orange-500/30 to-yellow-400/30";

    case "target":
      return classname + "from-violet-500/30 to-purple-400/30";

    default:
      break;
  }
}

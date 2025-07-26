import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { generateStats, getGradient } from "@/lib/constants/dashboard_helper";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dashboard_data } from "@/lib/utils";

import { cardHover, itemVariants } from "@/lib/animations";
import { ChevronRight } from "lucide-react";
import { InterviewSession, DashboardData } from "@/types/allTypes";

export function DashboardStats({
  interviewsessions,
}: {
  interviewsessions: InterviewSession[];
}) {
  const [dashdata, setDashboarddata] = useState<DashboardData | undefined>(
    undefined
  );

  useEffect(() => {
    if (interviewsessions) {
      setDashboarddata(dashboard_data(interviewsessions));
    }
  }, [interviewsessions]);

  const statstoShow = generateStats(dashdata);
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
    >
      {statstoShow.map((stat, index) => (
        <motion.div
          key={stat.title}
          whileHover={cardHover}
        >
          <Card className={getGradient(stat.gradientKey)}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-white/80" />
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                </motion.div>
              </div>
              <CardTitle className="text-sm text-white/80 font-medium mb-1">
                {stat.title}
              </CardTitle>
              <CardDescription className="text-3xl text-white font-bold mb-2">
                {stat.value}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

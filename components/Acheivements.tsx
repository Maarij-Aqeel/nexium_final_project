import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";
import { Award, ChevronRight } from "lucide-react";
import { recentAchievements } from "@/lib/constants/dashboard_helper";

export default function Achievements() {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 h-fit">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
          <Award className="w-5 h-5 text-yellow-400" />
          Recent Achievements
        </h2>

        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            >
              <achievement.icon
                className={`w-5 h-5 ${achievement.color} mt-0.5 group-hover:scale-110 transition-transform`}
              />
              <div>
                <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          View All Achievements
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </Card>
    </motion.div>
  );
}

"use client";
import { useState, useEffect, use } from "react";
import useSWR from "swr";
import { stats, recentAchievements } from "@/lib/constants/mockdata";
import { useUser } from "../context/user-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getallinterviews } from "@/lib/db/Handleinterview";
import {
  TableCell,
  TableHeader,
  TableBody,
  Table,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { motion, AnimatePresence, easeInOut, easeOut } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Award, BarChart3, ChevronRight } from "lucide-react";

type Interview = {
  id: string;
  created_at: string;
  created_by: string;
  title: string;
  difficulty: string;
  duration: number;
};

export default function Dashboard() {
  const { user, profile } = useUser();
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [interview_arr, setInterview] = useState<Interview[]>([]);

  const fetcher = (id: string) => getallinterviews(id);

  const { data: interviews, error } = useSWR(
    user?.id ? user.id : null,
    fetcher
  );

  useEffect(() => {
    if (interviews) {
      setInterview(interviews); 
    }
  }, [interviews]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      case "In Progress":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "Scheduled":
        return "bg-orange-500/20 text-orange-300 border border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Professional":
        return "text-red-400 bg-red-500/10 border border-red-500/20";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20";
      case "Beginner":
        return "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 p-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome back, {profile?.name || "User"}
              </h1>
              <p className="text-lg text-gray-400 mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={cardHover}
              className="group cursor-pointer"
            >
              <Card
                className={`h-40 p-6 rounded-2xl shadow-xl backdrop-blur-md bg-gradient-to-tr ${stat.gradient} border border-white/10 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-sm text-white/80 font-medium mb-1">
                    {stat.title}
                  </CardTitle>
                  <CardDescription className="text-3xl text-white font-bold mb-2">
                    {stat.value}
                  </CardDescription>
                  <p className="text-xs text-white/60">{stat.change}</p>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Interviews Table */}
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                  Recent Interviews
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-white/80 font-semibold">
                        Interview
                      </TableHead>
                      <TableHead className="text-white/80 font-semibold">
                        Score
                      </TableHead>
                      <TableHead className="text-white/80 font-semibold">
                        Difficulty
                      </TableHead>
                      <TableHead className="text-white/80 font-semibold">
                        Duration
                      </TableHead>
                      <TableHead className="text-white/80 font-semibold">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {interview_arr.map((interview, index) => (
                        <motion.tr
                          key={interview.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <TableCell className="font-medium text-white group-hover:text-blue-300 transition-colors">
                            <div>
                              <p>{interview.title}</p>
                              <p className="text-xs text-gray-400">
                                {/* {interview.date} */}
                              </p>
                            </div>
                          </TableCell>
                          {/* <TableCell
                            className={`font-bold text-lg ${getScoreColor(
                              interview.score
                            )}`}
                          >
                            {interview.score}%
                          </TableCell> */}
                          <TableCell>
                            <Badge
                              className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(
                                interview.difficulty
                              )}`}
                            >
                              {interview.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {interview.duration} min
                          </TableCell>
                          <TableCell>
                            {/* <Badge
                              className={`px-3 py-1 text-xs rounded-full ${getStatusVariant(
                                interview.status
                              )}`}
                            >
                              {interview.status}
                            </Badge> */}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>

          {/* Recent Achievements */}
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
        </div>
      </motion.div>
    </div>
  );
}

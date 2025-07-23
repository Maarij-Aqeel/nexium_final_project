"use client";
import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { containerVariants, itemVariants } from "@/lib/animations";
import { useUser } from "../context/user-context";
import { Card } from "@/components/ui/card";
import { getsessions } from "@/lib/db/Handleinterview";
import {
  TableCell,
  TableHeader,
  TableBody,
  Table,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { DashboardStats } from "@/components/DashboardStats";
import Achievements from "@/components/Acheivements";

type InterviewSession = {
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
    difficulty: string;
    duration: number;
    title: string;
  };
};

export default function Dashboard() {
  const { profile } = useUser();
  const [interviewsessions, setAllSessions] = useState<InterviewSession[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchSessions = useCallback((id: string) => getsessions(id), []);

  // SWR to prevent multiple calls to DB
  const { data: allsessions } = useSWR(profile?.id ?? null, fetchSessions, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (allsessions) {
      const parsed = allsessions.map((session: any) => ({
        ...session,
        questions: JSON.parse(session.questions),
      }));
      setAllSessions(parsed);
    }
  }, [allsessions]);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      case "in progress":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "scheduled":
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

  return (
    <div className="min-h-screen bg-hero-gradient text-white overflow-hidden">
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
        <DashboardStats interviewsessions={interviewsessions} />

        {/* Recent Interviews Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                  Recent Interviews
                </h2>
              </div>

              <div className="w-full overflow-hidden  no-scrollbar">
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
                      {(isExpanded
                        ? interviewsessions
                        : interviewsessions.slice(0, 6)
                      ).map((interview, index) => (
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
                              <p>{interview.interviews.title}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(
                                  interview.completed_at
                                ).toLocaleDateString("en-PK", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell
                            className={`font-bold text-lg ${getScoreColor(
                              interview.scores
                            )}`}
                          >
                            {interview.scores}%
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(
                                interview.interviews.difficulty
                              )}`}
                            >
                              {interview.interviews.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {interview.interviews.duration} min
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`px-3 py-1 text-xs rounded-full ${getStatusVariant(
                                interview.status
                              )}`}
                            >
                              {interview.status}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Achievements */}
          <Achievements />
        </div>
      </motion.div>
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { InterviewSession } from "@/types/allTypes";
import { containerVariants, itemVariants } from "@/lib/animations";
import { useUser } from "../context/user-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getsessions } from "@/lib/db/Handleinterview";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  User,
  Activity,
} from "lucide-react";
import { DashboardStats } from "@/components/DashboardStats";
import Achievements from "@/components/Acheivements";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const { profile } = useUser();
  const [interviewsessions, setAllSessions] = useState<InterviewSession[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleInterviewClick = (interview: InterviewSession) => {
    router.push(`/results/?p=${interview.interviews.id}&q=${profile?.id}`);
  };

  const fetchSessions = useCallback((id: string) => getsessions(id), []);

  // SWR to prevent multiple calls to DB
  const {
    data: allsessions,
    error,
    isLoading,
  } = useSWR(profile?.id ?? null, fetchSessions, {
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
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10";
      case "in progress":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-sm shadow-blue-500/10";
      case "scheduled":
        return "bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-sm shadow-orange-500/10";
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
        return "text-red-400 bg-red-500/10 border border-red-500/20 shadow-sm shadow-red-500/10";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 shadow-sm shadow-yellow-500/10";
      case "Beginner":
        return "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-sm shadow-emerald-500/10";
      default:
        return "text-gray-400 bg-gray-500/10 border border-gray-500/20";
    }
  };

  if (isLoading) {
    return <Loading msg1="Loading your Dashboard..." />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-hero-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
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
          className="relative z-10 space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-900/60 backdrop-blur-md text-white border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              <CardHeader className="p-8 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="space-y-3">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      Welcome back, {profile?.name || "User"}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      {new Date().toLocaleDateString("en-PK", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <DashboardStats interviewsessions={interviewsessions} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Interviews Table */}
            <motion.div variants={itemVariants} className="xl:col-span-2">
              <Card className="bg-gray-900/60 backdrop-blur-md text-white border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                <CardHeader className="p-6 border-b border-gray-700/50">
                  <CardTitle className="text-2xl font-semibold flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    Recent Interviews
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your interview performance and progress
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-gray-700/50 hover:bg-transparent">
                          <TableHead className="text-white/80 font-semibold p-4">
                            Interview
                          </TableHead>
                          <TableHead className="text-white/80 font-semibold p-4">
                            Score
                          </TableHead>
                          <TableHead className="text-white/80 font-semibold p-4">
                            Difficulty
                          </TableHead>
                          <TableHead className="text-white/80 font-semibold p-4">
                            Duration
                          </TableHead>
                          <TableHead className="text-white/80 font-semibold p-4">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {(isExpanded
                            ? interviewsessions
                            : interviewsessions.slice(0, 7)
                          ).map((interview, index) => (
                            <motion.tr
                              key={interview.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              onClick={() => handleInterviewClick(interview)}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-700/30 hover:bg-gray-800/40 transition-all duration-200 group cursor-pointer"
                              whileHover={{ x: 5 }}
                            >
                              <TableCell className="font-medium text-white group-hover:text-primary transition-colors p-4">
                                <div className="space-y-1">
                                  <p className="font-semibold">
                                    {interview.interviews.title}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(
                                      interview.completed_at
                                    ).toLocaleDateString("en-PK", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="p-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`text-2xl font-bold ${getScoreColor(
                                      interview.scores
                                    )}`}
                                  >
                                    {interview.scores}%
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="p-4">
                                <Badge
                                  className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 hover:scale-105 ${getDifficultyColor(
                                    interview.interviews.difficulty
                                  )}`}
                                >
                                  {interview.interviews.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-300 p-4 font-medium">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-primary" />
                                  {interview.interviews.duration} min
                                </div>
                              </TableCell>
                              <TableCell className="p-4">
                                <Badge
                                  className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 hover:scale-105 ${getStatusVariant(
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
                  </div>

                  {interviewsessions.length > 7 && (
                    <div className="flex justify-center p-6 border-t border-gray-700/50">
                      <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="ghost"
                        className="text-primary rounded-xl  hover:text-primary/90 hover:bg-primary/10 transition-all duration-200 flex items-center gap-2"
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Show More <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants} className="xl:col-span-1">
              <Card className="bg-gray-900/60 backdrop-blur-md text-white border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl h-fit">
                <CardHeader className="p-6 border-b border-gray-700/50">
                  <CardTitle className="text-2xl font-semibold flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    Achievements
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your accomplishments and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Achievements interviewsessions={interviewsessions}/>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Stats Summary */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-900/60 backdrop-blur-md text-white border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              <CardHeader className="p-6 border-b border-gray-700/50">
                <CardTitle className="text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  Performance Overview
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your interview journey at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {interviewsessions.length}
                    </div>
                    <div className="text-sm text-gray-400">
                      Total Interviews
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-emerald-400">
                      {
                        interviewsessions.filter(
                          (s) => s.status.toLowerCase() === "completed"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-yellow-400">
                      {interviewsessions.length > 0
                        ? Math.round(
                            interviewsessions.reduce(
                              (acc, curr) => acc + curr.scores,
                              0
                            ) / interviewsessions.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-gray-400">Average Score</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-400">
                      {
                        interviewsessions.filter(
                          (s) =>
                            s.scores >
                            Math.round(
                              interviewsessions.reduce(
                                (acc, curr) => acc + curr.scores,
                                0
                              ) / interviewsessions.length
                            )
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-400">High Scores</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

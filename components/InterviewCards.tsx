"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ConfigureInterview from "./ConfigureInterview";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Interviews from "@/lib/constants/Interviews";
import { TextFade } from "./FadeUp";
import CustomInterview from "./CustomInterview";

export default function InterviewCards() {
  const [selectedInterview, setSelectedInterview] = useState<any | null>(null);
  const [customInterview, setCustomInterview] = useState<any | null>(null);

  const GetColor = (tag: string) => {
    const classname = `inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold  backdrop-blur-sm  `;
    return tag.toLowerCase() === "trending"
      ? classname +
          "text-red-400 bg-red-500/20 border border-red-500/30 shadow-sm shadow-red-500/10"
      : tag.toLowerCase() === "beginner"
      ? classname +
        "bg-emerald-500/20  text-emerald-300 shadow-sm shadow-emerald-500/10  border-emerald-500/30"
      : classname +
        "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-sm shadow-blue-500/10";
  };

  return (
    <>
      {/* Cards Grid */}
      <TextFade direction="up">
        <div className="flex justify-end mr-6 mb-6">
          <Button
            variant={"outline"}
            className="bg-white/5 rounded-2xl hover:scale-105 hover:bg-white/30 border border-white/30 px-5 py-5 backdrop-blur font-semibold text-white text-lg transition-all duration-200"
            onClick={() => setCustomInterview(true)}
          >
            Custom Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-6 max-w-8xl mx-auto px-4">
          {Interviews.map((interview, index) => (
            <Card
              key={index}
              className="group relative h-[300px] overflow-hidden p-0 mt-5 hover:scale-105 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ease-out bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-700/30 rounded-2xl border border-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:via-secondary/5 hover:to-accent/5 cursor-pointer backdrop-blur-sm"
              onClick={() => setSelectedInterview(interview)}
            >
              {/* Tag in top-right corner */}
              {interview.tag && (
                <div className="absolute top-3 right-3 z-10 ">
                  <span className={GetColor(interview.tag)}>
                    {interview.tag}
                  </span>
                </div>
              )}

              {/* Subtle animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <CardHeader className="relative p-6 gap-4">
                <div className="flex flex-row items-start justify-between">
                  <div className="relative">
                    <img
                      src={interview.icon}
                      alt={interview.title}
                      className="w-16 h-16 rounded-xl "
                    />
                  </div>

                  {/* hover arrow with animation */}
                  <div className="relative">
                    <img
                      src="https://img.icons8.com/?size=100&id=RCQdxueNvljL&format=png&color=ffffff"
                      className="w-8 h-8 opacity-0 group-hover:opacity-80 transition-all duration-300 transform group-hover:translate-x-1 mt-10 group-hover:-translate-y-1 filter drop-shadow-lg"
                      alt="Start interview"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <CardTitle className="text-xl text-left font-bold leading-tight break-words text-white group-hover:text-primary/90 transition-colors duration-300">
                    {interview.title}
                  </CardTitle>
                  <CardDescription className="text-base text-left text-slate-300 group-hover:text-slate-200  transition-colors duration-300 leading-relaxed">
                    {interview.description}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Card>
          ))}
        </div>
      </TextFade>

      {customInterview && (
        <div className="fixed inset-0 items-center transition-all duration-200 justify-center backdrop-blur-md flex bg-black/60 px-4">
          <CustomInterview controlstate={setCustomInterview} />
        </div>
      )}

      {selectedInterview && (
        <div className="transition-all duration-200 fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="w-full sm:w-4/6 md:w-2/4 lg:w-2/6 max-w-2xl">
            <div className="relative w-full bg-gradient-to-r from-[#090c13]/95 to-[#111827]/95 p-8 rounded-3xl shadow-2xl">
              <ConfigureInterview
                interview={selectedInterview}
                controlstate={setSelectedInterview}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

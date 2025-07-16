"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ConfigureInterview from "./ConfigureInterview";
import { useState } from "react";
import Interviews from "@/lib/constants/Interviews";

export default function InterviewCards() {
  const [selectedInterview, setSelectedInterview] = useState(null);

  return (
    <>
      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {Interviews.map((interview, index) => (
          <Card
            key={index}
            className="group p-4 mt-5 hover:scale-105 hover:border-primary hover:shadow-2xl transition-all duration-300 ease-out bg-slate-600/10 rounded-2xl border-primary/20 hover:bg-gradient-to-r from-primary/10 to-secondary/10 cursor-pointer "
            onClick={() => setSelectedInterview(interview)}
          >
            <CardHeader className="p-4 gap-5 mb-2">
              <div className="flex flex-row items-center justify-between ">
                <img
                  src={interview.icon}
                  alt={interview.title}
                  className="w-16 h-16"
                />
                <img
                  src="https://img.icons8.com/?size=100&id=RCQdxueNvljL&format=png&color=000000"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <CardTitle className="text-xl  text-left font-bold leading-snug break-words">
                {interview.title}
              </CardTitle>
              <CardDescription className="text-lg text-left text-muted-foreground">
                {interview.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative bg-[#111827] border border-primary p-8 rounded-xl h-2/3 w-full sm:w-4/6 md:w-2/4 lg:w-2/6 max-w-2xl shadow-2xl">
            {/* Form */}
            <ConfigureInterview
              interview={selectedInterview}
              controlstate={setSelectedInterview}
            />
          </div>
        </div>
      )}
    </>
  );
}

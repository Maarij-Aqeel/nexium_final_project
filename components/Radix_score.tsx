"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ 
  value = 75, 
  size = 150, 
  strokeWidth = 12, 
  showScore = true,
  duration = 2
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Circle with Gradient */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="100%" stopColor="#00FF94" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: circumference - (progress / 100) * circumference 
            }}
            transition={{ 
              duration: duration, 
              ease: "easeInOut",
              delay: 0.2 
            }}
            className="drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px rgba(0, 217, 255, 0.3))"
            }}
          />
        </svg>

        {/* Score Display */}
        {showScore && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: duration * 0.5,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <motion.span
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: duration * 0.7 }}
              >
                {Math.round(progress)}
              </motion.span>
              <div className="text-xs text-gray-400 mt-1">SCORE</div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;

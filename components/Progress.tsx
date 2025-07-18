"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

export default function Progress({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      {/* animation for the glowing blob */}
      <style>
        {`@keyframes progress {
          to {
            left: calc(100% - 2rem);
          }
        }
        .progress {
          transform-origin: center;
          animation: progress 3.25s ease-in-out infinite;
        }`}
      </style>

      <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full  bg-primary/20">
        <ProgressPrimitive.Indicator
          className="relative h-full w-full flex-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        >
          <div className="absolute left-0  w-6 h-full bg-black blur-[10px] inset-y-0 progress" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
}

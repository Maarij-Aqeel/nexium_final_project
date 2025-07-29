"use client";

interface GlowTrailProps {
  children: React.ReactNode;
  className?: string;
  rounded?: string; // <- Add this
}
// Works in any Next.js file without <style jsx>
export default function GlowTrail({
  children,
  className = "",
  rounded = "rounded-xl",
}: GlowTrailProps) {
  return (
    <div
      className={`relative ${rounded} overflow-hidden p-1 ${className}`}
      style={{
        "--c1": "rgba(0,217,255,0.8)",
        "--c2": "rgba(0,255,148,0.8)",
        // boxShadow: "0 0 30px 1px rgba(0,255,255,0.2)",
      }}
    >
      {/* animated rotating gradient (the glow) */}
      <div
        className={`absolute inset-0 ${rounded}`}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--c1) 40deg, var(--c2) 120deg, transparent 160deg)",
          filter: "blur(10px)",
          transform: "scale(8.08)",
          animation: "spinGlow 5s linear infinite",
        }}
      />

      {/* solid inner background so the glow only appears on the edge */}
      <div
        className={`relative z-10 bg-background/80 ${rounded} w-full h-full flex items-center justify-center`}
      >
        {children}
      </div>

      {/* keyframes injected once via global CSS */}
      <style jsx global>{`
        @keyframes spinGlow {
          to {
            transform: scale(1.08) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

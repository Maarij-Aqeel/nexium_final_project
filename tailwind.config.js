/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#1A1A1A",
        card: "#111111",
        foreground: "#FFFFFF",
        primary: "#00D9FF",
        secondary: "#00FF94",
        muted: "#9CA3AF",
        destructive: "#EF4444",
        border: "#2A2A2A",
        input: "#2A2A2A",
        ring: "#00D9FF",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 100% 60% at 50% 10%, #00D9FF15 0%, transparent 70%)," +
          "radial-gradient(ellipse 70% 40% at 100% 100%, #00FF9415 0%, transparent 70%)," +
          "linear-gradient(135deg, #000 0%, #111 100%)",
      },
      animation: {
        "custom-ping": "customPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        float: "float 20s ease-in-out infinite",
        "float-reverse": "float 20s ease-in-out infinite reverse",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        customPing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "75%": { transform: "scale(2)", opacity: "0" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        float: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(40px, -40px) rotate(180deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "30%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-2%, 5%)" },
          "70%": { transform: "translate(4%, 3%)" },
          "90%": { transform: "translate(-1%, 4%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Firefox */
          scrollbarWidth: "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

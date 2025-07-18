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
          "linear-gradient(135deg, #000000 0%, #1a1f2e 50%, #0C0E13 100%)",
      },
      animation: {
        "custom-ping": "customPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        customPing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "75%": { transform: "scale(2)", opacity: "0" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

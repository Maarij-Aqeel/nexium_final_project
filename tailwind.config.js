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
    },
  },
  plugins: [],
};

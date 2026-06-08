import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4ED",
        card: "#FFFFFF",
        ink: "#1F1B16",
        muted: "#857C6E",
        line: "#E6DFD1",
        acacia: { DEFAULT: "#1A6B45", dark: "#124E33", soft: "#E5F0E8" },
        clay: { DEFAULT: "#C65A2E", soft: "#F7E5DA" },
        gold: "#D9A441",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,27,22,.06), 0 8px 24px -16px rgba(31,27,22,.18)",
        lift: "0 8px 30px -12px rgba(31,27,22,.28)",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        breathe: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".55" } },
        ring: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        grow: { "0%": { transform: "scaleY(0)" }, "100%": { transform: "scaleY(1)" } },
        growX: { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        fadeUp: "fadeUp .5s ease both",
        breathe: "breathe 2s ease-in-out infinite",
        ring: "ring 1s linear infinite",
        grow: "grow .6s cubic-bezier(.2,.8,.2,1) both",
        growX: "growX .6s cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;

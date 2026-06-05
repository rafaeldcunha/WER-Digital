import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#8CE600",
          bright: "#A6FF1A",
        },
        brand: {
          black: "#070707",
          surface: "#111111",
          red: "#FF2A2A",
          white: "#F4F5F2",
          muted: "#C2C7BB",
          gray: "#6B7280",
          border: "#1F1F1F",
        },
      },
      fontFamily: {
        display: ["var(--font-saira)", "sans-serif"],
        body: ["var(--font-hanken)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "neon-glow":
          "radial-gradient(ellipse at center, rgba(140, 230, 0, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        neon: "0 0 30px rgba(140, 230, 0, 0.55)",
        "neon-sm": "0 0 8px rgba(140, 230, 0, 0.4)",
      },
      animation: {
        "reveal-1": "reveal .8s cubic-bezier(.2,.7,.2,1) .1s both",
        "reveal-2": "reveal .8s cubic-bezier(.2,.7,.2,1) .28s both",
        "reveal-3": "reveal .8s cubic-bezier(.2,.7,.2,1) .44s both",
        "reveal-4": "reveal .8s cubic-bezier(.2,.7,.2,1) .6s both",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

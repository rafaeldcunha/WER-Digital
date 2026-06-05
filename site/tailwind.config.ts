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
        // Identidade Grupo Rolê da Gurizada
        neon: {
          DEFAULT: "#9BEC00",
          50: "#f4ffe0",
          100: "#e5ffc0",
          200: "#c8ff80",
          300: "#9BEC00",  // cor principal
          400: "#7abf00",
          500: "#5a8e00",
        },
        brand: {
          black: "#0B0B0B",   // fundo principal
          surface: "#141414", // superfícies / cards
          red: "#E11D2A",     // acento — usar pouco
          white: "#F2F2F2",   // texto principal
          gray: "#6B7280",    // texto secundário
          border: "#1F1F1F",  // bordas sutis
        },
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "speed-gradient":
          "linear-gradient(135deg, #0B0B0B 0%, #141414 50%, #0B0B0B 100%)",
        "neon-glow":
          "radial-gradient(ellipse at center, rgba(155, 236, 0, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(155, 236, 0, 0.4), 0 0 40px rgba(155, 236, 0, 0.2)",
        "neon-sm": "0 0 8px rgba(155, 236, 0, 0.5)",
        "red-glow": "0 0 20px rgba(225, 29, 42, 0.4)",
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(155, 236, 0, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(155, 236, 0, 0.8), 0 0 40px rgba(155, 236, 0, 0.4)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

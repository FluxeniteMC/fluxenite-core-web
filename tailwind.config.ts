import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}", "./three/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f1e8",
        ivory: "#fffdfa",
        pearl: "#ebe1d5",
        champagne: "#c0a177",
        bronze: "#9b7650",
        obsidian: "#171717"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 30px 90px rgba(115, 92, 68, 0.18)",
        glass: "inset 0 1px 0 rgba(255,255,255,.75), 0 24px 70px rgba(80,62,44,.13)"
      },
      backgroundImage: {
        radialLuxury: "radial-gradient(circle at 70% 20%, rgba(255,255,255,.98), transparent 34%), radial-gradient(circle at 20% 10%, rgba(207,184,151,.38), transparent 30%), linear-gradient(135deg, #fffdfa 0%, #f3eadf 55%, #dfd2c3 100%)"
      },
      keyframes: {
        shimmer: { "0%": { transform: "translateX(-120%)" }, "100%": { transform: "translateX(120%)" } }
      },
      animation: { shimmer: "shimmer 2.8s ease-in-out infinite" }
    }
  },
  plugins: []
};

export default config;

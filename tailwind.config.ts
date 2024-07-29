import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-0.5": "#F4F4F4",
        "gray-1": "#E8E8E8",
        "gray-1.5": "#DDDDDD",
        "gray-2": "#D1D1D1",
        "gray-3": "#BABABA",
        "gray-4": "#A3A3A3",
        "gray-5": "#8C8C8C",
        "gray-6": "#707070",
        "gray-7": "#545454",
        "gray-8": "#383838",
        "gray-8.5": "#2A2A2A",
        "gray-9": "#1C1C1C",
        "gray-9.5": "#0E0E0E",
        "cnt-light": "#FBFBFB",
        "cnt-dark": "#0C0C0C",
      },
      fontFamily: {
        sans: ["Overused Grotesk", "system-ui"],
        serif: ["Instrument Serif"],
        mono: ["ui-monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;

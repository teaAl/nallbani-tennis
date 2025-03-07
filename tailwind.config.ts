import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // pear: "var(--pear)",
        // olive: "var(--olive)",
        // coolgray: "var(--coolgray)",
        // violet: "var(--violet)",
        // lazurite: "var(--lazurite)",
        background: '#0a0a0a',
        foreground: '#afafaf',
        pear: '#cddc3b',
        olive: '#648767',
        coolgray: '#A7A5C6',
        violet: '#827191',
        lazurite: '#456990',
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        nunito: "var(--font-nunito)",
      },

      keyframes: {
        pulse: {
          "0%, 100%": {
            transform: 'scale(1)',
            opacity: '1',
          },
          "50%": {
            transform: 'scale(1.1)',
            opacity: '0.7',
          },
        }
      },
      animation: {
        pulse: 'pulse 2s infinite',
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/public/**/*.{js,ts,jsx,tsx,mdx, png, jpg, jpeg, svg, gif, webp}",
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
        background: '#0a0a0a', //181818
        foreground: '#afafaf',
        pear: '#cddc3b',
        olive: '#648767', //5f845d
        coolgray: '#A7A5C6',
        violet: '#827191',
        lazurite: '#456990',
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        nunito: "var(--font-nunito)",
      },
      backgroundImage: {
        login: "url('/images/parallax-4.jpg')", //linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
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
  plugins: [
    require('tailwindcss-animated'),
  ],
};

// export default config;

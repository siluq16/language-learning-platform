import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A6D1FD", // Sky Glass
          light: "#D8EBFE",
          dark: "#68A5E8",
        },
        brand: {
          dark: "#2B1572", // Deep Purple
          purple: "#4622A3",
        },
        ai: {
          DEFAULT: "#A000C8", // Magenta
        },
        status: {
          success: "#358200",
          error: "#C40000",
          warning: "#A35A00",
        },
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
    },
  },
  plugins: [],
};
export default config;

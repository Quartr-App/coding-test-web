/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter-family)", "sans-serif"],
      },
      colors: {
        "company-gray": {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#b0b0b0",
          400: "#6b6b6b",
          500: "#555555",
          600: "#333333",
        },
      },
    },
  },
  plugins: [],
};

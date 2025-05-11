/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#722ed1", // Purple color for primary elements
        secondary: "#13c2c2", // Cyan color for secondary elements
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  // Enable dark mode
  darkMode: "class",
  // Ensure Ant Design components work well with Tailwind
  important: true,
};

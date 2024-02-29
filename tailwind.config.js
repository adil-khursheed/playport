/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "370px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "dark-1": "#0F0F0F",
      "dark-2": "#222222",
      "light-1": "#FFFFFF",
      "light-2": "#C6C6C6",
      "green-1": "#169529",
      "green-light": "#BBF7D0",
      "orange-1": "#EA580F",
      "red-light": "#FECACA",
      "red-dark": "#B91C1C",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [],
};

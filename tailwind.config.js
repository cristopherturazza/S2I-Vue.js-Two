/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    colors: {
      meat: "#BC4749",
      sand: "#F2E8CF",
      lightgreen: "#A7C957",
      mediumgreen: "#6A994E",
      darkgreen: "#386641",
      stone: colors.stone,
    },
    extend: {},
  },
  plugins: [],
};

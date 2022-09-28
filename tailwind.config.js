/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    colors: {
      meat: "#BC4749",
      lightmeat: "#f1dada",
      sand: "#F2E8CF",
      lightgreen: "#A7C957",
      verylightgreen: "#cce09f",
      mediumgreen: "#6A994E",
      darkgreen: "#386641",
      stone: colors.stone,
    },
    extend: {},
  },
  plugins: [],
};

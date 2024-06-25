/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
        1: "1",
      },
      colors: {
        "semi-transparent-black": "rgba(30, 30, 30, 0.2)",
        defaultgreen: "#00F58C",
        defaultlightgreen: "#B8FBCF",
        defaultdarkgreen: "#00854D",
        default02green: "rgba(0, 245, 140, 0.2)",
        defaultwhite: "#F5F5F5",
        defaultwhitesemi: "rgba(245, 245, 245, 0.5)",
        defaultblack2: "#1E1E1E",
        verylightblue: "#E9E7FB",
        black07: "rgba(30, 30, 30, 0.7)",
      },
      fontFamily: {
        groteskpan: ["Px_Grotesk_Pan-Regular", "Helvetica"],
        groteskpanbold: ["Px_Grotesk_Pan-Bold", "Helvetica"],
        grotesk: ["Px_Grotesk-Light", "Helvetica"],
        questrial: ["Questrial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

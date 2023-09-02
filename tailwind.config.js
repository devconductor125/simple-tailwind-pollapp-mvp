module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "100px auto",
      },
      gridTemplateRows: {
        header: "64px auto",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

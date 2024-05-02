// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        apex: "#0f90c9",
        wilds: "#ee4708",
        baja: "#25a847",
        classS2: "#1e5dd4",
        classS1: "#a75dc3",
        classA: "#e83354",
        classB: "#ee621c",
        classC: "#fbc538",
        classD: "#71c3e6",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
     darkMode: "class",
     content: [
          "./pages/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
          extend: {
               dropShadow: {
                    "glow-pink": "0 0 20px rgba(250, 88, 182, 0.8)",
                    "glow-purple": "0 0 20px rgba(122, 11, 192, 0.8)",
               },
               colors: {
                    coderun: {
                         "pink-light": "#FC9BD3",
                         pink: "#FA58B6",
                         purple: "#7A0BC0",
                         "dark-purple": "#270082",
                         dark: "#1A1A40",
                         accent: "#FA58B6",
                    },
               },
               fontFamily: {
                    mono: ["JetBrains Mono", "monospace"],
                    sans: ["Inter", "sans-serif"],
               },

               animation: {
                    "glitch-1": "glitch-1 2s infinite",
                    "glitch-2": "glitch-2 2s infinite",
                    float: "float 6s ease-in-out infinite",
                    "glow-pulse":
                         "glow-pulse 2s ease-in-out infinite alternate",
               },
               keyframes: {
                    "glitch-1": {
                         "0%, 100%": { transform: "translate(0)" },
                         "20%": { transform: "translate(-2px, 2px)" },
                         "40%": { transform: "translate(-2px, -2px)" },
                         "60%": { transform: "translate(2px, 2px)" },
                         "80%": { transform: "translate(2px, -2px)" },
                    },
                    "glitch-2": {
                         "0%, 100%": { transform: "translate(0)" },
                         "20%": { transform: "translate(2px, -2px)" },
                         "40%": { transform: "translate(2px, 2px)" },
                         "60%": { transform: "translate(-2px, -2px)" },
                         "80%": { transform: "translate(-2px, 2px)" },
                    },

                    float: {
                         "0%, 100%": { transform: "translateY(0px)" },
                         "50%": { transform: "translateY(-20px)" },
                    },
                    "glow-pulse": {
                         "0%": {
                              filter: "drop-shadow(0 0 20px #FA58B6) drop-shadow(0 0 40px #7A0BC0)",
                         },
                         "100%": {
                              filter: "drop-shadow(0 0 40px #FA58B6) drop-shadow(0 0 80px #7A0BC0)",
                         },
                    },
               },
               backgroundImage: {
                    "gradient-coderun":
                         "linear-gradient(135deg, #FA58B6 0%, #7A0BC0 100%)",
                    "gradient-cyberpunk":
                         "linear-gradient(45deg, #1A1A40 0%, #270082 50%, #7A0BC0 100%)",
               },
          },
     },
     plugins: [
          require("@designbycode/tailwindcss-text-glitch"),
          require("tailwindcss-animate"),
     ],
};

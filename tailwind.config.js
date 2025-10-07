/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          "./pages/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
          extend: {
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
                    glitch: "glitch 2s infinite",
                    "glitch-2": "glitch-2 2s infinite",
                    float: "float 6s ease-in-out infinite",
                    "glow-pulse":
                         "glow-pulse 2s ease-in-out infinite alternate",
                    "text-glitch":
                         "text-glitch 0.3s ease-in-out infinite alternate",
               },
               keyframes: {
                    glitch: {
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
                    "text-glitch": {
                         "0%": {
                              textShadow: "2px 0 #FA58B6, -2px 0 #7A0BC0",
                         },
                         "100%": {
                              textShadow: "-2px 0 #FA58B6, 2px 0 #7A0BC0",
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

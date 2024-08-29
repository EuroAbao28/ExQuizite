/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        countdown: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        opacityShow: {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
        modalShow: {
          from: { transform: "translateY(-300%)" },
          to: { transform: "translateY(0)" },
        },
        badge_immortal: {
          "0%": { backgroundColor: "#1c1917", color: "#ef4444" },
          "50%": { backgroundColor: "#292524", color: "#facc15" },
          "100%": { backgroundColor: "#1c1917", color: "#ef4444" },
        },
      },
      animation: {
        countdown8s: "countdown 8s linear forwards",
        countdown10s: "countdown 10s linear forwards",
        countdown15s: "countdown 15s linear forwards",
        opacityShow: "opacityShow .5s forwards",
        modalShow: "modalShow .5s ease-in-out forwards",
        badgeAnimation: "badge_immortal 2s infinite",
      },
      gridTemplateColumns: {
        "custom-7": "20px 20px 1fr 40px 40px 40px 40px",
      },
      boxShadow: {
        "custom-shadow":
          " rgba(0, 0, 0, 0.2) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};

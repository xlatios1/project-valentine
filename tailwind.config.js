/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Jump/vibrate animation
        jumpMail: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-8px)" },
          "50%": { transform: "translateY(4px)" },
          "75%": { transform: "translateY(-4px)" },
        },
        // Fade in for the note
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          "100%": { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
        },
      },
      animation: {
        jumpMail: "jumpMail 0.6s ease-in-out",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeOut: "fadeOut 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

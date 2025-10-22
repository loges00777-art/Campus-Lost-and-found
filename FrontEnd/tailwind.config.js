// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Roboto", "Poppins"],
        body: ["Roboto", "Poppins"],
      },
      fontSize: {
        // fontSize: [fontSize, lineHeight]
        sm: ["1.20rem", "1.25rem"], // 14px font size, line height 20px
        base: ["1.15rem", "1.5rem"], // 16px font size, line height 24px
        lg: ["1.125rem", "1.75rem"], // 18px font size, line height 28px
        xl: ["1.5rem", "2rem"], // 24px font size, line height 32px
        "2xl": ["1.875rem", "2.25rem"], // 30px font size, line height 36px
        "3xl": ["2.25rem", "2.5rem"], // 36px font size, line height 40px
        "4xl": ["3rem", "1"], // 48px font size, line height 16px (tight)
      },
    },
  },
  plugins: [],
};

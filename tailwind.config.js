/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        Auth: ["#FFF5E0"],
        AuthBtn:["#435334"],
        AuthBtnHover:["#9EB384"]
      },
    },
    fontFamily: {
      signature: ["Ubuntu"],
    },
  },
  
  plugins: [],
}


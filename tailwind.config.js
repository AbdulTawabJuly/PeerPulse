/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        Auth: ["#FFF5E0"],
        AuthBtn:["#435334"],
        AuthBtnHover:["#9EB384"],
        Room:["#7D7C7C"],
      },
    },
    fontFamily: {
      signature: ["Ubuntu"],
      GV:["Great Vibes"],
      Logo:["Fredericka the Great"],
    },
  },
  
  plugins: [],
}


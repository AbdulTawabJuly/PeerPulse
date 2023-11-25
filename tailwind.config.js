/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        Auth: ["#FFF5E0"],
        AuthBtn:["#435334"],
        AuthBtnHover:["#9EB384"],
        Room:["#7D7C7C"],
        LPageNavfrom:["#86A789"],
        LPageNavTo:["#D2E3C8"],
        LPageFrom:["#A06F44"],
        LPageTo:["#F2ECB6"],
      },
    },
    fontFamily: {
      signature: ["Ubuntu"],
      GV:["Great Vibes"],
      GVBold:["Great Vibes Bold"],
      Raleway:["Raleway"],
      Logo:["Fredericka the Great"],
    },
  },
  
  plugins: [],
}


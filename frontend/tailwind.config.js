module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'cookie': ['Cookie', 'cursive'],
     }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

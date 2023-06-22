module.exports = {
  content: ['./src/**/*.{html,js,jsx,njk}'],

  corePlugins: {
    preflight: false, // Disable Tailwind's base styles
  },

  theme: {
    extend: {},
  },
  plugins: [],
}

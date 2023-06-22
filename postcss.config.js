const browserslist = require('browserslist')

module.exports = (ctx) => ({
  plugins: {
    'postcss-import-ext-glob': {},
    'postcss-import': {},
    tailwindcss: {},
    'postcss-lightningcss': {
      // Lightning CSS doesn't transpile by default unless we pass the browserslist
      browsers: browserslist(),
      lightningcssOptions: { minify: ctx.env === 'production' },
    },
  },
})

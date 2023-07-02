const svgSprite = require('eleventy-plugin-svg-sprite')
module.exports = (config) => {
  config.addPassthroughCopy('src/assets')

  // Inline SVGs as a sprite
  config.addPlugin(svgSprite, {
    path: 'src/assets/svg',
    globalClasses: 'icon',
  })

  config.addShortcode('icon', (name, customClass) => {
    return `<svg aria-hidden="true" class="icon ${customClass}"><use href="#svg-${name}"></use></svg>`
  })

  return {
    markdownTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}

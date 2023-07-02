const markdownIt = require('markdown-it')
const svgSprite = require('eleventy-plugin-svg-sprite')

module.exports = (config) => {
  config.addPassthroughCopy('src/assets')

  // Put all projects in a collection
  config.addCollection('projects', (collection) => {
    return collection.getFilteredByGlob('src/projects/*.md')
  })

  // Add filter to transform markdown to HTML
  config.addFilter('md', (content) => {
    const md = new markdownIt({ html: true })
    let inline = !content.includes('\n')

    return inline ? md.renderInline(content) : md.render(content)
  })

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

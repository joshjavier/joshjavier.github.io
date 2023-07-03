const typeset = require('typeset')
const markdownIt = require('markdown-it')
const svgSprite = require('eleventy-plugin-svg-sprite')

module.exports = (config) => {
  config.setServerOptions({
    watch: ['dist/css/main.css'],
    showAllHosts: true,
  })

  config.addPassthroughCopy('src/assets')

  // Put all projects in a collection
  config.addCollection('projects', (collection) => {
    return collection.getFilteredByGlob('src/projects/*.md')
  })

  // Use curly quotes, ellipses, em dash, etc. to improve typography
  config.addTransform('typeset', (content) => {
    return typeset(content, { disable: ['hangingPunctuation', 'hyphenate'] })
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

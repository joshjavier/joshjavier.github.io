module.exports = (config) => {
  config.addPassthroughCopy('src/images')

  return {
    markdownTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}

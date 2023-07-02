const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{html,js,jsx,njk}'],

  corePlugins: {
    preflight: false, // Disable Tailwind's base styles since we're using our own reset
  },

  theme: {
    colors: {
      white: '#FFFFFF',
      'white-shade': '#C4C4C44D',
      light: '#FEFCE9',
      dark: '#393939',
      'dark-tint-10': '#4D4D4D',
      'dark-tint-30': '#747474',
      primary: '#606C38',
      'primary-tint-30': '#909874',
      'primary-tint-85': '#E7E9E1',
      secondary: '#DDA15E',
      tertiary: '#264653',
    },

    extend: {
      // Define min and max viewport widths for Utopian scales
      screens: {
        min: '320px',
        max: '1440px',
      },
    },
  },

  plugins: [
    // Define fluid custom properties
    plugin(({ addBase, theme }) => {
      const minWidth = theme('screens.min').replace('px', '')
      const maxWidth = theme('screens.max').replace('px', '')

      addBase({
        ':root': {
          '--fluid-min-width': minWidth,
          '--fluid-max-width': maxWidth,
          '--fluid-screen': '100vw',
          '--fluid-bp':
            'calc( (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) / (var(--fluid-max-width) - var(--fluid-min-width)) )',
        },
        [`@media screen and (min-width: ${maxWidth}px)`]: {
          ':root': {
            '--fluid-screen': 'calc(var(--fluid-max-width) * 1px)',
          },
        },
      })
    }),

    // Expose design tokens as custom properties
    plugin(({ addBase, config }) => {
      const currentConfig = config()
      const groups = [
        { key: 'colors', prefix: 'color' },
        // { key: 'spacing', prefix: 'space' },
      ]

      const root = {}
      groups.forEach(({ key, prefix }) => {
        const group = currentConfig.theme[key]
        Object.keys(group).forEach((key) => {
          const token = group[key]
          const isNested = typeof token === 'object' && token !== null

          let customPropertyName = `--${prefix}-${key.replace('.', '_')}`

          if (isNested) {
            Object.keys(token).forEach((key) => {
              root[
                `${customPropertyName}${key === 'DEFAULT' ? '' : `-${key}`}`
              ] = token[key]
            })
          } else {
            root[customPropertyName] = token
          }
        })
      })

      addBase({ ':root': root })
    }),
  ],
}

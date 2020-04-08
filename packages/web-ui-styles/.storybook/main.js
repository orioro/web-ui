module.exports = {
  stories: [
    '../stories/**/*.stories.[tj]s'
  ],
  presets: [
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    },
  ]
}

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Links Newsletter'
        return args
      })
  }
}

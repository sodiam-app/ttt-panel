const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  devServer: {
    port: 9000,
    // host: 'panel.taetrueteam.fun',
  },
}

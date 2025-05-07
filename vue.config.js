const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/csp_quiz/',
  transpileDependencies: [
    'vuetify'
  ]
})

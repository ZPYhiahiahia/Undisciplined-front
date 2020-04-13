import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Vuetify from 'vuetify' // 引入Vuetify
import contentmenu from 'v-contextmenu' // 引入右键菜单

import db from './datastore'
import _ from 'lodash'
import 'vuetify/dist/vuetify.min.css' // 引入Vuetify的css文件
import 'material-design-icons-iconfont/dist/material-design-icons.css' // 引入Material Desgin Icon的css文件
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import 'v-contextmenu/dist/index.css' // 右键菜单css

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(contentmenu)
// Vue.use(ElementUI)
Vue.prototype.$db = db
Vue.prototype._ = _

// axios 配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  vuetify: new Vuetify(),
  template: '<App/>'
}).$mount('#app')

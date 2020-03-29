import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/avue.js'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

// import EleForm from 'vue-ele-form'
// // 注册 vue-ele-form组件
// Vue.use(EleForm)

const http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.prototype.$http = http;
Vue.prototype.$httpajax = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

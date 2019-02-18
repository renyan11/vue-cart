import Vue from 'vue'
//import App from './App'
import Layout from './components/Layout'
import router from './router'
import VueResource from 'vue-resource'
import Mock from './mock/mock'
import ElementUI from 'element-ui'
/*加载elementui */
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)

Mock.init()

new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})

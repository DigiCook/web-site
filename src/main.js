import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import Bootstrap from '@/bootstrap'

Vue.config.productionTip = false
Vue.use(Bootstrap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

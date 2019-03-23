import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from  'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '../public/css/reset.css'
import '../public/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(MuseUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import request from 'request'
import 'semantic-ui-css/semantic.min.css'

Vue.use(SuiVue)
Vue.use(request)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

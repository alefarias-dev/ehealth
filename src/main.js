import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// our dependencies
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Vue2Sidebar from 'vue2-sidebar';
Vue.use(Vue2Sidebar)
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import VueSweetAlert2 from 'vue-sweetalert2'
Vue.use(VueSweetAlert2)
import axios from 'axios'
import VueAxios from 'vue-axios' 
Vue.use(VueAxios, axios)

// our bootstrap css files dependencies
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

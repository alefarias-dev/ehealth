import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import EHealthLogin from './views/EHealthLogin.vue'
import TestingEthereum from './views/TestingEthereum.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/ehealth',
      name: 'ehealth-login',
      component: EHealthLogin
    },
    {
      path: '/ethereum',
      name: 'testing-ethereum',
      component: TestingEthereum
    }
  ]
})

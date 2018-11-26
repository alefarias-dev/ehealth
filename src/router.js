import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import EHealthLogin from './views/EHealthLogin.vue'
import TestingEthereum from './views/TestingEthereum.vue'
import Doctor from './views/Doctor.vue'

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
      path: '/ethereum-debug',
      name: 'testing-ethereum',
      component: TestingEthereum
    },
    {
      path: '/medico',
      name: 'medico',
      component: Doctor
    }
  ]
})

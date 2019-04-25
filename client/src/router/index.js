import Vue from 'vue'
import Router from 'vue-router'
import GetQuotes from '@/views/get-quotes.vue'
import ResultQuotes from '@/views/result-quotes.vue'

import '@/assets/css/reset.css'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GetQuotes',
      component: GetQuotes
    },

    {
      path: '/results',
      name: 'ResultQuotes',
      component: ResultQuotes
    }
  ]
})

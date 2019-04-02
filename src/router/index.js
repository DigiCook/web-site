import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OtherPage from '@/components/OtherPage'
import Carte from '@/components/Carte'
import Listing from '@/components/Listing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      name: 'OtherPage',
      path: '/page',
      component: OtherPage
    },
    {
      name: 'Carte',
      path: '/carte',
      component: Carte
    },
    {
      name: 'Listing',
      path: '/listing',
      component: Listing
    }
  ]
})

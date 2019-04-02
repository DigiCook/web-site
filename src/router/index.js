import Vue from 'vue'
import Router from 'vue-router'
import OtherPage from '@/components/OtherPage'
import Carte from '@/components/Carte'
import Accueil from '@/components/Accueil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
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
    }

  ]
})

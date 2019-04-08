import Vue from 'vue'
import Router from 'vue-router'
import OtherPage from '@/components/OtherPage'
import Carte from '@/components/Carte'
import Accueil from '@/components/Accueil'
import Listing from '@/components/Listing'
import DescriptionMenu from '@/components/DescriptionMenu'

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
    },
    {
      name: 'DescriptionMenu',
      path: '/menu/:id',
      component: DescriptionMenu,
      props: true
    },
    {
      name: 'Listing',
      path: '/listing',
      component: Listing
    }
  ]
})

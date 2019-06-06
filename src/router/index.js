import Vue from 'vue'
import Router from 'vue-router'
import Recapitulatif from '@/components/Recapitulatif'
import Accueil from '@/components/accueil/Accueil'
import Listing from '@/components/Listing'
import DescriptionMenu from '@/components/DescriptionMenu'
import Live from '@/components/Live'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      name: 'Recapitulatif',
      path: '/recapitulatif',
      component: Recapitulatif
    },
    {
      name: 'DescriptionMenu',
      path: '/menu/:id',
      component: DescriptionMenu,
      props: true
    },
    {
      name: 'Listing',
      path: '/listing/:id/',
      component: Listing,
      props: true
    },
    {
      name: 'Live',
      path: '/live',
      component: Live
    }
  ]
})

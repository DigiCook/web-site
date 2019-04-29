import Vue from 'vue'
import Router from 'vue-router'
import OtherPage from '@/components/OtherPage'
import Carte from '@/components/Carte'
import Recapitulatif from '@/components/Recapitulatif'
import Accueil from '@/components/accueil/Accueil'
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
    }
  ]
})

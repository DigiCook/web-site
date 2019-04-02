import Vue from 'vue'
import Vuex from 'vuex'

import example from '@/store/modules/example'
import commande from '@/store/modules/commande'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    example,
    commande,
    menu
  }
})

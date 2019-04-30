import * as types from '@/store/mutationTypes'

const state = {
  menus: [
    {
      id: 1,
      nom: 'Menu enfant',
      prix: 25,
      description: 'C\'est un menu, pour les enfants. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      urlPhoto: 'https://assets.afcdn.com/story/20180327/de-simples-oeufs-mayo-bien-tradi-mais-bien-mis-en-scene-pour-paques-1152577_w767h767c1cx707cy1060.jpg',
      quantite: 1
    },
    {
      id: 3,
      nom: 'Menu Savoyard',
      prix: 30,
      description: 'Le gras c\'est la vie ! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      urlPhoto: 'https://assets.afcdn.com/story/20180327/de-simples-oeufs-mayo-bien-tradi-mais-bien-mis-en-scene-pour-paques-1152577_w767h767c1cx707cy1060.jpg',
      quantite: 2
    }
  ],
  plats: [
    {
      id: 1,
      nom: 'Tarte aux Pommes',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      prix: 24.5,
      urlPhoto: 'somethink',
      quantite: 2,
      typePlatId: {
        id: 3,
        libelle: 'Désert'
      }
    },
    {
      id: 1,
      nom: 'Tiramisu',
      description: 'supercallifragilis',
      prix: 14.5,
      urlPhoto: 'somethink',
      quantite: 10,
      typePlatId: {
        id: 3,
        libelle: 'Désert'
      }
    }
  ]
}

const mutations = {
  DELETE_LINE_MENU (state, id) {
    const index = state.menus.findIndex(x => x.id === id)
    console.log('000000000000000', index, state.menus)
    if (index >= 0) {
      state.menus.splice(index, 1)
      console.log('After removal:', state.menus)
    }
  },
  DELETE_LINE_PLAT (state, id) {
    const index = state.plats.findIndex(x => x.id === id)
    if (index >= 0) {
      state.plats.splice(index, 1)
      console.log('After removal:', state.menus)
    }
  },
  [types.DELETE_ORDER] (state) {
    state.menus = []
    state.plats = []
  },
  [types.ADD_MENU_TO_COMMANDE] (state, menu) {
    // Check if the menu is already in the Commande.
    const foundMenu = state.menus.find(m => m.id === menu.id)

    if (foundMenu) {
      foundMenu.quantite ++
    } else {
      state.menus.push({
        quantite: 1,
        ...menu
      })
    }
  },
  [types.ADD_PLAT_TO_COMMANDE] (state, plat) {
    // Check if the plat is already in the Commande.
    const foundPlat = state.plats.find(m => m.id === plat.id)

    if (foundPlat) {
      foundPlat.quantite ++
    } else {
      state.plats.push({
        quantite: 1,
        ...plat
      })
    }
  }
}

const actions = {
  deleteLineMenu (context, id) {
    context.commit('DELETE_LINE_MENU', id)
  },
  deleteLinePlat (context, id) {
    context.commit('DELETE_LINE_PLAT', id)
  },
  deleteOrder ({ commit }) {
    commit(types.DELETE_ORDER)
  },
  addMenuToCommande ({ commit }, menu) {
    if (menu) {
      commit(types.ADD_MENU_TO_COMMANDE, menu)
    }
  },
  addPlatToCommande ({ commit }, plat) {
    if (plat) {
      commit(types.ADD_PLAT_TO_COMMANDE, plat)
    }
  }
}

const getters = {
  getCommandeMenu: state => state.menus,
  getCommandePlat: state => state.plats
}

export default {
  state,
  getters,
  mutations,
  actions
}

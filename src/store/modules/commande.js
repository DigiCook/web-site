import * as types from '@/store/mutationTypes'

const state = {
  menus: [],
  plats: []
}

const mutations = {
  DELETE_LINE_MENU (state, id) {
    const index = state.menus.findIndex(x => x.id === id)
    if (index >= 0) {
      state.menus.splice(index, 1)
    }
  },
  DELETE_LINE_PLAT (state, id) {
    const index = state.plats.findIndex(x => x.id === id)
    if (index >= 0) {
      state.plats.splice(index, 1)
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

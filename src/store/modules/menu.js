import * as types from '@/store/mutationTypes'

const state = {
  menus: []
}

const mutations = {
  [types.SET_MENU] (state, menus) {
    state.menus = menus
  }
}

const actions = {
  setMenu ({commit}, menus) {
    if (menus) {
      commit(types.SET_MENU, menus)
    }
  },
  addMenu ({ commit, state }, menu) {
    const menus = [...state.menus]
    // Check if the menu is already in the store.
    const menuFound = menus.find(m => m.id === menu.id)

    if (menuFound) {
      const indexToReplace = menus.indexOf(menuFound)
      // Replace with the full menu + save it.
      menus.splice(indexToReplace, 1, menu)
      commit(types.SET_MENU, menus)
    }
  }
}

const getters = {
  getMenus: state => state.menus
}

export default {
  state,
  getters,
  mutations,
  actions
}

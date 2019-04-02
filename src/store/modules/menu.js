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

import * as types from '@/store/mutationTypes'

const state = {
  typesPlat: []
}

const mutations = {
  [types.SET_TYPEPLAT] (state, typesPlat) {
    state.typesPlat = typesPlat
  }
}

const actions = {
  setTypesPlat ({commit}, typesPlat) {
    if (typesPlat) {
      commit(types.SET_TYPEPLAT, typesPlat)
    }
  }
}

const getters = {
  getTypesPlat: state => state.typesPlat
}

export default {
  state,
  getters,
  mutations,
  actions
}

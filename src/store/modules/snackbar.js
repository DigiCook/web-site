import * as types from '@/store/mutationTypes'

const state = {
  display: false,
  text: '',
  time: 0
}

const mutations = {
  [types.DISPLAY_NEW_SNACKBAR] (state, { text, time }) {
    state.text = text
    state.time = time
    state.display = true
  },
  [types.HIDE_SNACKBAR] (state) {
    state.display = false
  }
}

const actions = {
  displayNewSnackbar ({ commit }, { text, time = 5000 }) {
    if (text) {
      commit(types.DISPLAY_NEW_SNACKBAR, { text, time })
    }
  },
  hideSnackbar ({ commit }) {
    commit(types.HIDE_SNACKBAR)
  }
}

const getters = {
  getSnackbarDisplay: state => state.display,
  getSnackbarText: state => state.text,
  getSnackbarTime: state => state.time
}

export default {
  state,
  getters,
  mutations,
  actions
}

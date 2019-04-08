// import * as types from '@/store/mutationTypes'

const state = {
  menus: [
    {
      id: 0,
      nom: 'Menu enfant',
      prix: 25.1,
      description: "c'est un menu, pour les enfants",
      urlPhoto: 'chépasadéterminer',
      quantite: 3
    },
    {
      id: 1,
      nom: 'Menu adulte, j ai la dale',
      prix: 35.45,
      description: "c'est un menu, pour les grands",
      urlPhoto: 'chépasadéterminer',
      quantite: 1
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
  }

}

const actions = {
  deleteLineMenu (context, id) {
    context.commit('DELETE_LINE_MENU', id)
  },
  deleteLinePlat (context, id) {
    context.commit('DELETE_LINE_PLAT', id)
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

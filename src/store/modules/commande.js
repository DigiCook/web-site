// import * as types from '@/store/mutationTypes'

const state = {
  menus: [
    {
      id: 0,
      nom: 'Menu enfant',
      description: "c'est un menu, pour les enfants",
      urlPhoto: 'chépasadéterminer'
    }
  ],
  plats: [
    {
      id: 1,
      nom: 'Tarte aux Pommes',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      prix: 24.5,
      urlPhoto: 'somethink',
      typePlatId: {
        id: 3,
        libelle: 'Désert'
      }
    }
  ]
}

const mutations = {
  // TODO: Add mutation for change the value of menus and plats.
}

const actions = {
  // TODO: Add action for change the value of menus and plats.
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

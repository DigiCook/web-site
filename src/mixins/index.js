import store from '@/store'

export default {
  computed: {
  },
  methods: {
    displaySnackbar (text, time = 50000) {
      store.dispatch('displayNewSnackbar', { text, time })
    }
  }
}

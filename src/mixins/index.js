import store from '@/store'

export default {
  computed: {
  },
  methods: {
    displaySnackbar (text, time = 5000) {
      store.dispatch('displayNewSnackbar', { text, time })
    }
  }
}

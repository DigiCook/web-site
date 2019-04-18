<template>
  <div class="Snackbar">
    {{ text }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SnackBar',
  components: {
  },
  props: {
  },
  mounted () {
  },
  data () {
    return {
      handler: null
    }
  },
  watch: {
    'display' () {
      const snackbar = document.querySelector('.Snackbar')

      if (this.display) {
        snackbar.classList.add('Snackbar-show')

        clearTimeout(this.handler)

        this.handler = setTimeout(() => {
          this.$store.dispatch('hideSnackbar')
        }, this.time)
      } else {
        snackbar.classList.remove('Snackbar-show')
      }
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      display: 'getSnackbarDisplay',
      text: 'getSnackbarText',
      time: 'getSnackbarTime'
    })
  }
}
</script>

<style scoped lang="scss">

.Snackbar {
  position: fixed;
  z-index: 42;
  height: 24px;
  padding: 14px;
  padding-left: 32px;
  padding-right: 32px;
  margin: auto;
  bottom: -52px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  line-height: 24px;
  text-align: center;

  background-color: #263238;
  color: #ccff90;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: bottom .1s linear;

  &-show {
    bottom: 0px;
  }
}

</style>

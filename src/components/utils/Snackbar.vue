<template>
  <div class="Snackbar">
    <p>{{ text }}</p>
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
  position: relative;
  z-index: 42;
  height: 24px;
  padding: 10px;
  padding-left: 32px;
  padding-right: 32px;
  margin: auto;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  line-height: 24px;
  text-align: center;

  background-color: $color-neutral;
  color: $color-white;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: bottom .1s linear;

  p {
    white-space: nowrap;
  }

  &-show {
    bottom: 44px;
  }
}

</style>

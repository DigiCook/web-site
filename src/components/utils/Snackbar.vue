<template>
  <div class="Snackbar">
    <p><slot></slot></p>
  </div>
</template>

<script>

export default {
  name: 'SnackBar',
  components: {
  },
  props: {
    backgroundColor: {
      type: [ String ],
      default: '#37474F'
    },
    color: {
      type: [ String ],
      default: '#FFFFFF'
    }
  },
  mounted () {
    const snackbar = document.querySelector('.Snackbar')

    if (snackbar) {
      snackbar.style.backgroundColor = this.backgroundColor
      snackbar.style.color = this.color
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>

.Snackbar {
  position: fixed;
  z-index: 42;
  height: 24px;
  padding: 12px;
  margin: auto;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.1rem;
}

</style>

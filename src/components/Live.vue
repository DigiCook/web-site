<template>
  <div class="Live">
    <video src="/vdo.webm" autoplay="true" width="640" height="480" preload="metadata"/>
  </div>
</template>

<script>

export default {
  name: 'Live',
  components: {
  },
  props: {
  },
  mounted () {
    console.log('[Live:mounted]')
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


<style scoped lang="scss">
</style>
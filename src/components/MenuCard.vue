<template>
    <aside><p>{{img}}</p><p>{{name}}</p></aside>
</template>

<script>
  export default {
    name: 'MenuCart',
    props: {
      name: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        'img': 'img'
      }
    }
  }
</script>

<style scoped lang="scss">


</style>
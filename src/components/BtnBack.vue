<template>
    <button @click="returnBack">
        <slot></slot>
    </button>
</template>

<script>
  export default {
    name: 'btn-back',
    methods: {
      returnBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
    button {
        position: absolute;
        padding: 10px 30px;
        left: 50px;
        top: 50px;
        background: #EA3939;
        border: 1px solid #EA3939;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
</style>

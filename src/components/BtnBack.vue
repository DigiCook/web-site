<template>
  <button @click="returnBack">
    <slot></slot>
  </button>
</template>

<script>
import Btn from '@/components/utils/Btn'

export default {
  name: 'btn-back',
  components: {
    Btn
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-back {
  position: absolute;
  padding: 10px 30px;
  left: 30px;
  top: 30px;
  color: $text-dark;
  background: $orange-ligth;
  box-sizing: border-box;
  font-size: $sub-title;
  font-weight: $weight-sub-title;
}
</style>

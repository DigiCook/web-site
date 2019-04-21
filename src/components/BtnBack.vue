<template>
  <btn class="btn-back" @click.native="returnBack">Retour</btn>
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
      // this.$router.go(-1)
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
  background: #EA3939;
  border: 1px solid #EA3939;
  box-sizing: border-box;
}
</style>

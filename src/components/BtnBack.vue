<template>
    <transition name="fade">
        <btn v-show="show" class="btn-back" @click.native="returnBack">Retour</btn>
    </transition>
</template>

<script>
  import Btn from '@/components/utils/Btn'

  export default {
    name: 'btn-back',
    components: {
      Btn
    },
    data () {
      return {
        id: '',
        show: false
      }
    },
    updated () {
      this.show = true
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
        background: $color-second;
        box-sizing: border-box;
        font-size: $sub-title;
        font-weight: $weight-sub-title;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

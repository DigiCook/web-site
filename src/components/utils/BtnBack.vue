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
    props: {
      souldBeShow: {
        type: [Boolean],
        default: true
      }
    },
    data () {
      return {
        id: '',
        show: this.souldBeShow
      }
    },
    updated () {
      this.show = true
    },
    methods: {
      returnBack () {
        this.$emit('clickOnMenu')
      }
    }
  }
</script>

<style scoped lang="scss">
    .btn-back {
        position: relative;
        padding: 8px 30px;
        left: 40px;
        top: 40px;
        color: $text-dark;
        background: $color-second;
        font-size: $sub-title;
        font-weight: $weight-sub-title;
        width: 52px;
        height: 20px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

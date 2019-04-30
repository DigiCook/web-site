<template>
  <div v-if="value" @click="close" class="popUp">
    <div class="popUp-background"></div>

    <div class="popUp-inner">
      <btn flat class="popUp-croix">
        <img src="../../assets/close.png"/>
      </btn>

      <div class="popUp-main">
        <div @click="clickOnContent" class="popUp-content">
          <slot></slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Btn from '@/components/utils/Btn'

export default {
  name: 'PopUp',
  components: {
    Btn
  },
  props: {
    value: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      // Close the PopUp and change the value of v-model.
      this.$emit('input', false)
    },
    clickOnContent (event) {
      // Stop propagation for avoid closing.
      event.stopPropagation()
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.popUp {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  &-background {
    background-color: $color-neutral;
    opacity: 0.8;
    width: 100%;
    height: 100%;
  }

  &-background {
    background-color: black;
    opacity: 0.2;
    width: 100%;
    height: 100%;
  }

  &-inner {
    position: absolute;
    left: 0px;
    top: 0px;
    margin: 10%;
    width: 80%;
    height: 75%;
  }

  &-main {
    display: flex;
    height: 100%;
  }

  &-croix {
    height: 36px;
    width: 36px;
    padding: 6px;
    margin-left: auto;
    background-color: white;
    border-radius: 50%;

    img { 
      height: 36px;
      width: 36px;
    }
  }

  &-content {
    margin: auto;
    margin-top: 20px;
    background-color: white;
    border-radius: 20px;
    width: 80%;
    height: 80%;
  }
}
</style>

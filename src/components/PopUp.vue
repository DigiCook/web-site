<template>
  <div v-if="value" class="popUp">
    <div @click="close" class="popUp-background">
    </div>
    <div @click="close" class="popUp-inner">
      <div @click="close" class="popUp-croix">
        <img src="../assets/close.png"/><!-- TODO: Use material icon -->
      </div>

      <div class="popUp-main">
        <div class="popUp-content">
          <slot></slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'PopUp',
  components: {
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
    height: 25px;
    width: 25px;
    padding: 12.5px;
    margin-left: auto;
    background-color: white;
    border-radius: 50%;

    img {
      height: 25px;
      width: 25px;
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

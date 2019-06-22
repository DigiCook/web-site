<template>
    <div v-on:click="upEvent" v-bind:class="{ croix: croix, moins: moins }" class="btnBg">
        <span>{{signe}}</span>
    </div>
</template>

<script>
  export default {
    name: 'BtnRecap',
    props: {
      signe: {
        type: [String]
      },
      croix: {
        type: [Boolean]
      },
      moins: {
        type: [Boolean]
      }
    },
    data () {
      return {}
    },
    methods: {
      upEvent () {
        this.$emit('onClick')
      }
    }
  }
</script>


<style scoped lang="scss">

    .btnBg {
        background-color: $color-second;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        font-size: 30px;
        font-family: $main-font;
        span {
            margin: auto;
        }

    }

    .croix {
        span {
            display: block;
            transform: rotate(45deg);

            font-size: 35px;
        }
    }

    .moins {
        span {
            line-height: 20px;
            margin-top: 0;
        }
    }
</style>
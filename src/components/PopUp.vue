<template>
    <div class="popUp">
        <div v-on:click="closePopUp" class="popUp-background">
        </div>
        <div v-on:click="closePopUp" class="popUp-inner">
            <div v-on:click="closePopUp" class="popUp-croix"><img src="../assets/close.png"></div>
            <div class="popUp-main">
                <div class="popUp-content">

                    <component
                            v-bind:is="currentPopUpComponent"
                    ></component>
                </div>
            </div>
        </div>

        <pop-up-help style="display: none"></pop-up-help>
        <pop-up-valider style="display: none"></pop-up-valider>
    </div>
</template>

<script>
  import PopUpHelp from '@/components/PopUpHelp'
  import PopUpValider from '@/components/PopUpValider'
  import PopUpPlat from '@/components/PopUpPlat'

  export default {
    name: 'PopUp',
    components: {
      PopUpValider,
      PopUpHelp,
      PopUpPlat
    },
    props: {
      typePopUp: {
        type: [String]
      }
    },
    data () {
      return {
        'currentPopUp': 'Help'
      }
    },
    methods: {
      closePopUp () {
        this.$emit('close')
      }
    },
    computed: {
      currentPopUpComponent: function () {
        return 'pop-up-' + this.typePopUp.toLowerCase()
      }
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
            opacity: 0.4;
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

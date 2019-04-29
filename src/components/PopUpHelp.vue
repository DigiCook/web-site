<template>
    <div class="help">
        <div v-on:click="askForHelp" class="help-button"><p>Faire appele à un serveur</p></div>
    </div>
</template>

<script>
  export default {
    name: 'PopUpHelp',
    methods: {
      askForHelp () {
        console.log('help Me !')
      }
    }
  }
</script>

<style scoped lang="scss">
    .help{
        display: flex;
        height: 100%;
        &-button{
            background-color: $button-alert;
            width: 200px;
            height: 75px;
            margin: auto;
            display: flex;
            border-radius: 20px;
            p{
                margin: auto;
                font-family: $main-font;
                color: $second-text-color;
            }
        }
    }

</style>
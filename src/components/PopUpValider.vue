<template>
    <div class="valider">
        <div v-on:click="validerCustomMenu" class="valider-button"><p>Valider le menu a la carte</p></div>
        <div v-on:click="ValiderCommande" class="valider-button"><p>Valider ma commande et accèder au récapitulatif</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PopUpValider',
    methods: {
      validerCustomMenu () {
        console.log('valider Le Menu')
      },
      ValiderCommande () {
        console.log('valider La commande')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .valider {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;

        &-button {
            background-color: $button-ok;
            width: 250px;
            height: 75px;
            margin: 20px auto;
            display: flex;
            border-radius: 20px;

            p {
                text-align: center;
                margin: auto;
                font-family: $main-font;
                color: $second-text-color;
            }
        }
    }
</style>
<template>
    <div v-on:click="onClick" class="button">
        <p>{{dataPlat.libelle}}</p>
    </div>
</template>

<script>
  export default {
    name: 'AddPlat',
    props: {
      dataPlat: {
        type: [Object]
      }
    },
    methods: {
      onClick () {
        console.log('direction vers ' + this.dataPlat.libelle)
      }

    }
  }
</script>

<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .button {
        background-color: $button-choice;
        padding: 20px;
        border-radius: 20px;
        margin: 20px auto;
        width: 50%;

        p {
            text-align: center;
            color: $second-text-color;
            font-size: 22px;
        }
    }

</style>
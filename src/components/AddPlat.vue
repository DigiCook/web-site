<template>
    <div v-on:click="onClick(dataPlat.id)" class="button">
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
      onClick (id) {
        this.$router.push(`listing/${id}`)
      }

    }
  }
</script>

<style scoped lang="scss">
    .button {
        background-color: $button-choice;
        padding: 20px;
        border-radius: 20px;
        margin: 20px auto;
        width: 50%;
        box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);

        p {
            text-align: center;
            color: $second-text-color;
            font-size: 22px;
        }
    }

</style>
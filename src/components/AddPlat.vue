<template>
    <div class="button">
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
    }
  }
</script>

<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .button{
        background-color: $button-choice;
        padding: 20px;
        border-radius: 20px;
        margin: 20px auto;
        width: 50%;
        p{
            text-align: center;
            color:$second-text-color;
            font-size: 22px;
        }
    }

</style>
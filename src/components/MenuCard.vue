<template>
    <aside v-on:click="onClick(dataMenu.id)" class="unMenu">
        <img class="unMenu-img" :src="dataMenu.urlPhoto"/>
        <p class="unMenu-text">{{dataMenu.nom}}</p>
    </aside>
</template>

<script>
  export default {
    name: 'MenuCart',
    props: {
      dataMenu: {
        type: [Object]
      }
    },
    methods: {
      onClick (id) {
        this.$router.push(`menu/${id}`)
      }

    }
  }
</script>

<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .unMenu {
        margin: 20px;
        background-color: $button-choice;
        border-radius: 25px;
        box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);
        &-img {
            width: 20vw;
            margin: 20px;
            border-radius: 50%;
            padding: 15px;
            padding-bottom: 0px;
        }

        &-text {
            font-size: 22px;
            text-align: center;
            padding-bottom: 20px;
            color: $second-text-color;
        }
    }

</style>
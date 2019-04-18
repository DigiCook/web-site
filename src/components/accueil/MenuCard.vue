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
    .unMenu {
        margin: 20px;
        background-color: $text-white;
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
            font-size: $sub-title;
            text-align: center;
            padding-bottom: 20px;
            color: $text-dark-ligth;
            font-weight: $weight-sub-title;
        }
    }

</style>